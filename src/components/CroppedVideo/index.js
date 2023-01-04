import React from "react";
// import Button from "../Button";
import * as C from "./styles";

const CroppedVideo = ({ handleDownload, videoSrc }) => {
    return videoSrc ? (
      <C.CroppedVideoContainer>    
        <div>
          <video src={videoSrc} controls width="200"></video>
        </div>
        {/* <Button Text="Download" onClick={handleDownload}></Button> */}
      </C.CroppedVideoContainer>
    ) : null;
  };

export default CroppedVideo;