import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer />
        </Suspense>
        <Analytics />
      </LoadingProvider>
    </>
  );
};

export default App;
