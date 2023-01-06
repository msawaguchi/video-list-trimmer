import React, { useState, useEffect, useRef  }  from "react";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../../hooks/useAuth";
import  useVideo  from "../../hooks/useVideo";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import * as helpers from "../../utils/videoHelpers";

import Button  from "../../components/Button";
import Playlist from "../../components/Playlist";
import Trimmer from "../../components/Trimmer";
import CroppedVideo from "../../components/CroppedVideo"

import * as C from "./styles";

const ffmpeg = createFFmpeg(
  // {log: true}
);

let RANGE_MAX = 100;

const Home = () => {
    const { video } = useVideo();
    const { logout, user } = useAuth();

    const navigate = useNavigate();
    const videoElement = useRef();

    const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
    const [cropList, setCropList] = useState([]);
    const [trimIsProcessing, setTrimIsProcessing] = useState(false);
    const [videoMeta, setVideoMeta] = useState(null);
    const [rStart, setRstart] = useState(0); // 0%
    const [rEnd, setRend] = useState(10); // 10%
    const [thumbnails, setThumbnails] = useState([]);
    const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
    const [URL, setURL] = React.useState("");
    const [testBlog, setTestBlob]= React.useState("");

    const load = async() => {
        await ffmpeg.load();
    }

    useEffect(() => {
      load();
    }, [])

    useEffect(() => {   
      async function loadVideo() {
         await fetch('resources/videos/'+video.path)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
          const fileBlob =  new File([blob], video.path)
          setTestBlob(fileBlob);
          setURL('resources/videos/'+video.path)
        }).catch((error) => {
          console.error('Error:', error);
        });
      }
     
    if ( video ) {
      loadVideo();
      setTrimmedVideoFile(null);
    }

    setCropList([]);
  }, [video])

  const handleUpdateRange = (func) => {
      return ({ target: { value } }) => {
        func(value);
      };
  };

  const handleLoadedData = async (e) => { 
    e.preventDefault()    
    const el = e.target;

    const meta = {
      name: video.path,
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight
    };
        
    setVideoMeta(meta);
    const thumbNails = await getThumbnails(meta);
    setThumbnails(thumbNails);
  };
  
   const getThumbnails = async ({ duration }) => {
      if (!ffmpeg.isLoaded()) await ffmpeg.load();
      setThumbnailIsProcessing(true);
      let MAX_NUMBER_OF_IMAGES = 15;
      let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
      let offset =
        duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / NUMBER_OF_IMAGES;
  
      const arrayOfImageURIs = [];
      ffmpeg.FS("writeFile", video.path, await fetchFile(testBlog));
  
      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));
  
        try {
          await ffmpeg.run(
            "-ss",
            startTimeInSecs,
            "-i",
            video.path,
            "-t",
            "00:00:1.000",
            "-vf",
            `scale=150:-1`,
            `img${i}.png`
          );
          const data = ffmpeg.FS("readFile", `img${i}.png`);
  
          let blob = new Blob([data.buffer], { type: "image/png" });
          let dataURI = await helpers.readFileAsBase64(blob);
          console.log(dataURI)
          ffmpeg.FS("unlink", `img${i}.png`);
          arrayOfImageURIs.push(dataURI);
        } catch (error) {
          console.log({ message: error });
        }

      }

      setThumbnailIsProcessing(false);
  
      return arrayOfImageURIs;
    };
  
    const handleTrim = async () => {
      setTrimIsProcessing(true);
  
      let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
      let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
  
      try {
        ffmpeg.FS("writeFile", video.path, await fetchFile(testBlog));
        await ffmpeg.run(
          "-ss",
          helpers.toTimeString(startTime),
          "-i",
          video.path,
          "-t",
          helpers.toTimeString(offset),
          "-c",
          "copy",
          "ping.mp4"
        );
  
        const data = ffmpeg.FS("readFile", "ping.mp4");
        const dataURL = await helpers.readFileAsBase64(
          new Blob([data.buffer], { type: "video/mp4" })
        );
  
        const newCrop = {
          videoData : video.id,
          startTime : rStart,
          endTime : rEnd,
          videoFile : dataURL
        }

        setCropList((oldCropList) => [...oldCropList, newCrop]);
        console.log(cropList)

        setTrimmedVideoFile(dataURL);
      } catch (error) {
        console.log(error);
      } finally {
        setTrimIsProcessing(false);
      }
    };

    return (
        <C.Container>
            <C.MenuBar> 
                <div>
                    <C.WelcomeText>
                        Olá, {user.nome ? user.nome : user.email}!
                    </C.WelcomeText>  
                    <C.Strong onClick={() => [logout(), navigate("/")]}>
                        Sair
                    </C.Strong>     
                </div>
            </C.MenuBar>
            <C.Main>
                <C.VideoList>
                    <h3>Playlist </h3>
                    <Playlist />
                </C.VideoList>
                <C.VideoPlayerContainer>
                    <h3>{video ? video.name : "Carregando..."}</h3>

                    <div className="videoplayer">
                      <video
                        ref={videoElement}
                        key={URL}  
                        controls
                        onLoadedMetadata={handleLoadedData}
                        width="780" height="400">
                          <source src={URL}  type="video/mp4" />
                          <source src={URL} type="video/ogg" />
                      </video>  
                    </div>
                  
                  <div className="trimmer">
                    <Trimmer
                      rEnd={rEnd}
                      rStart={rStart}
                      handleUpdaterStart={handleUpdateRange(setRstart)}
                      handleUpdaterEnd={handleUpdateRange(setRend)}
                      loading={thumbnailIsProcessing}
                      videoMeta={videoMeta}
                      control={
                        <Button Text={trimIsProcessing ? "Processando..." : "Cortar"} onClick={handleTrim}></Button>
                      }
                      thumbNails={thumbnails}
                    />
                    
                    {
                      cropList && 
                      cropList.map((crop, index) => { 
                        return (
                          <div key={index} className="croplist">
                            <CroppedVideo
                              videoSrc={crop.videoFile}
                              handleDownload={() => helpers.download(crop.videoFile)}
                            />
                            <span> {helpers.toTimeString(
                                      (crop.startTime / RANGE_MAX) * videoMeta.duration,
                                      false
                                   )}  <span> -  </span>
                                    {helpers.toTimeString(
                                      (crop.endTime / RANGE_MAX) * videoMeta.duration,
                                      false
                                    )} 
                            </span>
                          </div>
                        )
                      })
                    }
                  </div>
                </C.VideoPlayerContainer>
            </C.Main>
        </C.Container>
    )
}

export default Home;