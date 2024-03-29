import React from "react";
import * as helpers from "../../utils/videoHelpers";
import * as C from "./styles";

export default function Trimmer({
    thumbNails,
    rEnd,
    rStart,
    handleUpdaterStart,
    handleUpdaterEnd,
    loading,
    control,
    videoMeta,
}) {
  let RANGE_MAX = 100;

  if (thumbNails.length === 0 && !loading) {
    return null;
  }

  if (loading) {
    return (
        <h2> Carregando.....</h2>
    );
  }

  return (
    <C.ThumbnailProcessor thumbsize={thumbNails.length}>
      {control}
      <div className="range_pack">
        <div className="image_box">
          {thumbNails.map((imgURL, id) => (
            <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
          ))}
          <div
            className="clip_box"
            style={{
              width: `calc(${rEnd - rStart}% )`,
              left: `${rStart}%`,
            }}
            data-start={helpers.toTimeString(
              (rStart / RANGE_MAX) * videoMeta.duration,
              false
            )}
            data-end={helpers.toTimeString(
              (rEnd / RANGE_MAX) * videoMeta.duration,
              false
            )}
          >
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterStart}
            value={rStart}
          />
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterEnd}
            value={rEnd}
          />
        </div>
      </div>
    </C.ThumbnailProcessor>
  );
}