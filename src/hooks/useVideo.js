import { useContext  } from "react";
import { VideoContext } from "../contexts/video";

const useVideo = () => {
    const context = useContext(VideoContext);

    return context;
}

export default useVideo;