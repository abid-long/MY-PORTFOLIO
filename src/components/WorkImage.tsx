import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import type { ReactNode } from "react";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  visual?: ReactNode;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  if (!props.link) {
    return (
      <div className="work-image">
        <div className="work-image-in" data-cursor={"disable"}>
          {props.visual ?? <img src={props.image} alt={props.alt} />}
        </div>
      </div>
    );
  }

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        {props.visual ?? <img src={props.image} alt={props.alt} />}
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
