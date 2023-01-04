import styled from "styled-components";
import InputMask from 'react-input-mask';

export const Input = styled(InputMask)`
    outline: none;
    padding: 16px 20px;
    width: 100%;
    border-radius: 5px;
    font-size: 16px;
    color:#bfbfbf;
    background-color: #18191e;
    border: none;

    &:focus {
        border: 2px solid #22a377;
    }
`;

