import styled, {css} from "styled-components";

export const ThumbnailProcessor = styled.div`
 .range_pack {
    position: relative;
    width: 780px;
    margin-bottom: 4.5rem;
    margin-top: 20px;
    display: flex;
  }
  
  .image_box > input {
    pointer-events: none;
    position: absolute;
    appearance: none;
    opacity: 0;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    top: 50%;
    background-color: transparent;
  }
  
  .image_box {
    width: 100%;
    display: flex;
    align-items: flex-start;
    position: relative;
    border: 2px solid #22a377;
    position: relative;
    height: 6rem;
    border-radius: 10px;
       
  }

  .image_box > img {
    height: 100%;
    ${props => 
        (props.thumbsize 
          ? css`max-width: calc(100% / ${props.thumbsize} );`
          : css`max-width: 100%;` )
     }  
  }
  
  .clip_box {
    border: 10px solid #22a377;
    position: absolute;
    height: 110%;
    box-shadow: 2000 0 5px 10px #22a377, -400px 0 5px -10px #22a377;
    transform: translateY(-5%);
    border-radius: 10px;
  }

  .clip_box::before,
  .clip_box::after {
    position: absolute;
    top: 70%;
    transform: translateY(104%);
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 0.7rem;
    font-size: 0.8rem;
    font-weight: 600;
    border: 2px solid #23a377;
  }
  .clip_box::before {
    content: attr(data-start);
    left: 0;
    transform: translateY(90%) translateX(-50%);
  }
  .clip_box::after {
    content: attr(data-end);
    right: 0;
    transform: translateY(90%) translateX(50%);
  }
  
  .clip_box_des {
    width: 1.3rem;
    height: 100%;
    background-color: #22a377;
    position: absolute;
    z-index: -1;
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
  }
  
  .clip_box_des:nth-child(1) {
    left: 0;
    transform: translateX(-70%);
    border-radius: 10px 0 0 10px;
  }
  .clip_box_des:nth-child(2) {
    right: 0;
    transform: translateX(70%);
    flex-flow: row-reverse;
    border-radius: 0 10px 10px 0;
  }
  .clip_box_des::before,
  .clip_box_des::after {
    content: "";
    width: 3px;
    background-color: #f2f2f2;
    border-radius: 100px;
  }
  .clip_box_des::before {
    height: 60%;
  }
  .clip_box_des::after {
    height: 40%;
  }
    .range::-webkit-slider-thumb {
    appearance: none;
    pointer-events: all;
    width: 30px;
    height: 200px;
    background: black;
    cursor: ew-resize;
  }
  
  .deck {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    align-items: start;
    margin-top: 1.4rem;
  
    gap: 4rem;
  }
  .deck > * {
    border-radius: 5px;
    align-items: start;
  }
  
  .deck > button {
    align-self: center;
  }
  
  .grid_txt_2 {
    display: grid;
    gap: 1rem;
  }
  `;