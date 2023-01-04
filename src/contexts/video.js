import React, { createContext, useEffect, useState } from "react";

export const VideoContext = createContext({});

export const VideoProvider = ({children}) => {
    const [video, setVideo] = useState(); 
    const [videos, setVideos] = React.useState([]);

    useEffect(() => {
        fetch('resources/videos/videos.json').then((res) => 
            res.json()).then((data) => {
                setVideos(data.videos);
                setVideo(data.videos[0]);
        });     
    },[]);

    return (
        <VideoContext.Provider
            value={{ video, setVideo, videos }}
        >
            {children}
        </VideoContext.Provider>
    )

}