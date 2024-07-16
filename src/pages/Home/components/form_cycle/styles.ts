import styled from "styled-components"

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${(props) => props.theme["gray-100"]};
font-size: 1.125rem;
font-weight: bold;
//Ao diminuir a tela, os inputs ficarem um abaixo do outro:
flex-wrap: wrap;
`
//INput Pai
const BaseInput = styled.input`

    background: transparent;
    height: 2.5rem;
    border: 0;
    //BOrda apenas na parte debaixo
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    font-weight: bold;
    font-size: 1.125rem;
    padding: 0 0.5rem;
    color: ${props => props.theme["gray-100"]};

    &:focus{
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }

    &::placeholder{
        color: ${props => props.theme["gray-500"]};
    }
`
//Input com Herança
export const TaskInput = styled(BaseInput)`
    flex: 1;

    //Aqui voce tita a seta do datalist deste input:
    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`
//Input com Herança
export const MinutesInput = styled(BaseInput)`
    width: 4rem;
`