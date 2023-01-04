import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
`;

export const Content = styled.div`
    gap: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 1px 10px #262525;;
    background-color: #202431;
    max-width: 400px;
    padding: 32px;
    border-radius: 5px;
`;

export const Label = styled.label`
    font-size: 18px;
    font-weight: 600;
    color: #c9c9c9;
    margin-bottom: 40px;
`;

export const LabelSignup = styled.label`
    font-size: 16px;
    color: #848484;
`;

export const LabelError = styled.label`
    font-size: 14px;
    color: red;
`;

export const Strong = styled.strong`
    cursor: pointer;

    a {
        text-decoration: none;
        color: #c9c9c9;

        &:hover {
           color: #fcfafa;
           transition: .7s;
        }
    }
`;