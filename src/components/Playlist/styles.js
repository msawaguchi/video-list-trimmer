import styled, { css } from "styled-components";

export const List = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const ItemList = styled.div`
    width: 100%;
    display: flex;
    color:#bfbfbf;
    flex-direction: row;
    padding: 16px 32px;
    border-bottom: 1px solid #32313b;

    svg {
        width: 36px;
        height: auto;
        margin-right: 16px;
    }

    div {
        display: flex;
        flex-direction: column;

        span {
            margin-top: 8px;
            font-size: small;     
        }
    }

    ${(props) => 
        props.isPlaying &&
            css`
                color: #4bc299;
                background-color: #1f2026;
            `
     }

     &:hover {
        cursor: pointer;
        background-color: #1f2026;
        color: #4bc299;
        transition: .7s;
     }
`;