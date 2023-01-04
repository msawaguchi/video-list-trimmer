import React from "react";
import useVideo from "../../hooks/useVideo";
import { HiPlay, HiPause } from "react-icons/hi";
import * as C from "./styles";

const Playlist = () => {
    const { video, videos, setVideo } = useVideo();

    const handleChangeVideo = (vd) => {
        if (vd.id === video.id) {
            return;
        }
        setVideo(vd);
    }

    return (
        <C.List>
           {
            videos.map((vd) => {
                return (
                    <C.ItemList key={vd.id} isPlaying={video.id === vd.id} onClick={() => handleChangeVideo(vd)}>
                        { video.id === vd.id ? <HiPause fill="#23a377" /> : <HiPlay fill="#B3B3B3"/>}
                        <div>
                            <strong>{vd.name}</strong>
                            <span>{vd.time}</span>
                        </div>
                    </C.ItemList>
                );  
            })
          } 
        </C.List>
    );
}

export default Playlist;