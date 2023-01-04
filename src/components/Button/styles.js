import styled from "styled-components";

export const Button = styled.button`
    padding: 16px 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    background-color: #22a377;
    color: white;
    font-weight: 600;
    font-size: 16px;
    max-width: 150px;
    height: 56px;

    &:hover {
        background-color: #4bc299;
        box-shadow: 0 1px 10px #262525;
        transition: .7s;
    }
`;