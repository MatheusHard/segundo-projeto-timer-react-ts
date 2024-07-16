import styled from "styled-components";


export const HomeContainer = styled.main`
flex: 1;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
}
`




export const BaseContador  = styled.button`

width: 100%;
border: 0;
padding: 1rem;
border-radius: 8px;

display: flex;
align-items: center;
justify-content: center;

gap: 0.5rem;
font-weight: bold;
color: ${(props) => props.theme["gray-100"]};

cursor: pointer;

//Caso disabled, mudar opacidade:
&:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }


`
export const ButtonStartContadorContainer = styled(BaseContador)`


    background: ${(props) => props.theme["green-500"]};
    //HOver so funcionara, caso não esteja disabled:
    &:not(:disabled):hover{
        background: ${(props) => props.theme["green-700"]};
    }

`

export const ButtonStopContadorContainer = styled(BaseContador)`


    background: ${(props) => props.theme["red-500"]};
    //HOver so funcionara, caso não esteja disabled:
    &:not(:disabled):hover{
        background: ${(props) => props.theme["red-700"]};
    }

`

