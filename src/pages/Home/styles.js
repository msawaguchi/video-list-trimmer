import styled from "styled-components";

export const MenuBar = styled.div`
    position: fixed;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background-color: #18191e;

    div {
        width: 80%;
    }
`;

export const WelcomeText = styled.span`
    position:absolute; 
    color: #c9c9c9;
    left: 32px;
    top: 15px; 
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

export const Strong = styled.strong`
    position:absolute; 
    cursor: pointer;
    text-decoration: none;
    color: #c9c9c9;
    right: 32px;
    top: 15px; 
    
    &:hover {
        color: #fcfafa;
        transition: .7s;
    }
`;

export const Main = styled.div`
    width: 100%;
    background-color: #202431;
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
`;

export const VideoList = styled.div`
    width: 40%;
    min-width: 300px;
    max-width: 450px;
    background-color: #202431;
    padding-top: 65px;

    h3 {
        color: #a6a6a6;
        margin-left: 32px;
        margin-bottom: 20px;
    }
`;

export const VideoPlayerContainer = styled.div`
    width: 100%;
    background-color: #202431;
    padding-top: 65px;
    padding-left: 20px;
    border-left: 1px solid #5a595e;

    h3 {
        color: #a6a6a6;
        margin-bottom: 20px;
    }

    button {
        margin-right: 20px;
    }

    .videoplayer {
        width: 780px;
        height: 400px;
        background-color: black;
        margin-bottom: 20px;
    }

    .trimmer {
        margin-top: 20px;
    }

    .croplist {
        display: flex;
        justify-items: center;
        align-items: center;
        color: white;
        margin-top: 20px;
    }
`;