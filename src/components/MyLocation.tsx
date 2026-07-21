import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles/MyLocation.css";

type Stage = "space" | "earth" | "map";

const STAGE_DURATIONS: Record<Stage, number> = {
  space: 4200,
  earth: 2600,
  map: 0, // driven by the real map flyover sequence instead of a fixed timer
};

// Real photographic planet/sun/star textures (NASA-sourced, CC BY 4.0,
// mirrored on Wikimedia Commons) — hotlinked via Special:FilePath so the
// redirect always resolves to the current file.
const WIKI = (file: string, width: number) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`;

const TEX = {
  stars: WIKI("Solarsystemscope_texture_2k_stars_milky_way.jpg", 2000),
  sun: WIKI("Solarsystemscope_texture_2k_sun.jpg", 400),
  mercury: WIKI("Solarsystemscope_texture_2k_mercury.jpg", 160),
  venus: WIKI("Solarsystemscope_texture_2k_venus_surface.jpg", 200),
  earth: WIKI("Solarsystemscope_texture_2k_earth_daymap.jpg", 900),
  mars: WIKI("Solarsystemscope_texture_2k_mars.jpg", 180),
  jupiter: WIKI("Solarsystemscope_texture_2k_jupiter.jpg", 340),
  saturn: WIKI("Solarsystemscope_texture_2k_saturn.jpg", 300),
  uranus: WIKI("Solarsystemscope_texture_2k_uranus.jpg", 220),
  neptune: WIKI("Solarsystemscope_texture_2k_neptune.jpg", 220),
};

// Real coordinates for each stop on the journey home — fed straight into
// Leaflet + real OpenStreetMap tiles, so the imagery is the real map.
const MAP_STOPS = [
  { label: "Bangladesh", coords: "23.6850° N, 90.3563° E", lat: 23.685, lng: 90.3563, zoom: 7 },
  { label: "Khulna", coords: "22.8456° N, 89.5403° E", lat: 22.8456, lng: 89.5403, zoom: 9 },
  { label: "Jessore", coords: "23.1697° N, 89.2137° E", lat: 23.1697, lng: 89.2137, zoom: 11 },
  { label: "Noapara", coords: "23.0332° N, 89.3952° E", lat: 23.0332, lng: 89.3952, zoom: 14.5 },
];

const HOLD_MS = [1700, 1500, 1500, 1800]; // pause at each stop before moving on
const FLY_DURATION = 1.6; // seconds, Leaflet's built-in animated pan+zoom

// CARTO's free "Dark Matter" tiles — real OpenStreetMap data, no API key,
// styled dark so it matches the site's night sky.
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const PIN_ICON_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
  <circle cx="17" cy="17" r="15" fill="#8ad8ff" fill-opacity="0.18"/>
  <circle cx="17" cy="17" r="7" fill="#ffffff" stroke="#8ad8ff" stroke-width="3"/>
</svg>`);

const pinIcon = L.icon({
  iconUrl: `data:image/svg+xml,${PIN_ICON_SVG}`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

// "You are here" marker for the final stop — my own photo sitting on top of
// a pin tail that points at the exact spot, like a driver/place marker in a
// real navigation app, instead of a separate arrived-card overlay.
const arrivedIcon = L.divIcon({
  html: `
    <div class="ml-avatar-pin">
      <div class="ml-avatar-pin-photo">
        <img src="/images/my-location-photo.png" alt="" />
      </div>
      <div class="ml-avatar-pin-tail"></div>
      <div class="ml-avatar-pin-pulse"></div>
    </div>`,
  className: "ml-avatar-pin-wrap",
  iconSize: [64, 86],
  iconAnchor: [32, 86],
});

const MyLocation = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [stage, setStage] = useState<Stage>("space");
  const [mapStep, setMapStep] = useState(0); // 0 Bangladesh 1 Khulna 2 Jessore 3 Noapara
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<L.Map | null>(null);

  // Stage 1 + 2: fixed cinematic timers (space flyby, then Earth approach)
  useEffect(() => {
    if (!isOpen) return;
    setStage("space");
    setMapStep(0);

    const t1 = setTimeout(() => setStage("earth"), STAGE_DURATIONS.space);
    const t2 = setTimeout(
      () => setStage("map"),
      STAGE_DURATIONS.space + STAGE_DURATIONS.earth
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  // Stage 3: real map flyover (Leaflet + OpenStreetMap) — Bangladesh -> Khulna -> Jessore -> Noapara
  useEffect(() => {
    if (!isOpen || stage !== "map" || !mapDivRef.current) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const first = MAP_STOPS[0];
    const map = L.map(mapDivRef.current, {
      center: [first.lat, first.lng],
      zoom: first.zoom,
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      fadeAnimation: true,
      zoomAnimation: true,
    });
    mapObjRef.current = map;

    L.tileLayer(TILE_URL, {
      attribution: TILE_ATTRIBUTION,
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    const marker = L.marker([first.lat, first.lng], { icon: pinIcon }).addTo(map);

    // container was hidden behind opacity:0 while the earlier stages played,
    // so make sure Leaflet re-measures it once it's actually on screen
    setTimeout(() => map.invalidateSize(), 50);

    setMapStep(0);

    const isFinalStop = (i: number) => i === MAP_STOPS.length - 1;

    const goToStop = (i: number) => {
      if (cancelled) return;
      const target = MAP_STOPS[i];
      setMapStep(i);
      marker.setLatLng([target.lat, target.lng]);
      map.flyTo([target.lat, target.lng], target.zoom, {
        duration: FLY_DURATION,
        easeLinearity: 0.25,
      });
      const onMoveEnd = () => {
        map.off("moveend", onMoveEnd);
        if (cancelled) return;
        if (isFinalStop(i)) {
          // Arrived at Noapara — swap the dot for my photo on a pin, right
          // on top of the real spot, instead of cutting to a separate card.
          marker.setIcon(arrivedIcon);
          const el = marker.getElement();
          el?.classList.add("ml-avatar-pin-landed");
          return;
        }
        timers.push(setTimeout(() => goToStop(i + 1), HOLD_MS[i]));
      };
      map.on("moveend", onMoveEnd);
    };

    timers.push(setTimeout(() => goToStop(1), HOLD_MS[0]));

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      map.remove();
      mapObjRef.current = null;
    };
  }, [isOpen, stage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mylocation-overlay" role="dialog" aria-modal="true">
      <button
        className="mylocation-close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Stage 1: Solar system flyby (real NASA/Solar System Scope textures) */}
      <div className={`ml-stage ml-space ${stage === "space" ? "ml-active" : "ml-gone"}`}>
        <div className="ml-stars" style={{ backgroundImage: `url(${TEX.stars})` }} />
        <div className="ml-vignette" />
        <div className="ml-solar-track">
          <div className="ml-planet ml-sun" style={{ backgroundImage: `url(${TEX.sun})` }} />
          <div className="ml-planet ml-mercury" style={{ backgroundImage: `url(${TEX.mercury})` }} />
          <div className="ml-planet ml-venus" style={{ backgroundImage: `url(${TEX.venus})` }} />
          <div className="ml-planet ml-earth-dot" style={{ backgroundImage: `url(${TEX.earth})` }} />
          <div className="ml-planet ml-mars" style={{ backgroundImage: `url(${TEX.mars})` }} />
          <div className="ml-planet ml-jupiter" style={{ backgroundImage: `url(${TEX.jupiter})` }} />
          <div className="ml-planet ml-saturn" style={{ backgroundImage: `url(${TEX.saturn})` }}>
            <div className="ml-ring" />
          </div>
          <div className="ml-planet ml-uranus" style={{ backgroundImage: `url(${TEX.uranus})` }} />
          <div className="ml-planet ml-neptune" style={{ backgroundImage: `url(${TEX.neptune})` }} />
        </div>
        <div className="ml-comet" />
        <p className="ml-caption ml-caption-space">leaving the solar system...</p>
      </div>

      {/* Stage 2: Earth approach (real Earth day-map texture, rotating) */}
      <div className={`ml-stage ml-earth-stage ${stage === "earth" ? "ml-active" : stage === "space" ? "ml-hidden" : "ml-gone"}`}>
        <div className="ml-stars ml-stars-still" style={{ backgroundImage: `url(${TEX.stars})` }} />
        <div className="ml-globe">
          <div className="ml-globe-map" style={{ backgroundImage: `url(${TEX.earth})` }} />
          <div className="ml-globe-clouds" />
          <div className="ml-globe-shade" />
          <div className="ml-globe-shine" />
          <div className="ml-globe-atmosphere" />
        </div>
        <p className="ml-caption">approaching Earth</p>
      </div>

      {/* Stage 3: Real map drill-down (Leaflet + real OpenStreetMap tiles) */}
      <div className={`ml-stage ml-map-stage ${stage === "map" ? "ml-active" : "ml-hidden"}`}>
        <div className="ml-map-viewport">
          <div ref={mapDivRef} className="ml-leaflet-map" />
          <div className="ml-map-shade" />
          <div key={mapStep} className="ml-zoom-pulse" />
        </div>

        <div key={mapStep} className="ml-map-chip">
          <span className="ml-map-chip-pin" />
          <div>
            <span className="ml-pin-label">{MAP_STOPS[mapStep].label}</span>
            <span className="ml-pin-coords">{MAP_STOPS[mapStep].coords}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLocation;
