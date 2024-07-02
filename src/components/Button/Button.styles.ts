import styled , {css} from "styled-components"; 

export type ButtonVariant = 'sucess' | 'warning' | 'danger'; 

interface ButtonContainerProps{
    variant: ButtonVariant;
}

const buttonVariants = {
    sucess: 'green',
    warning: 'yellow',
    danger: 'red'
} 
export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 80px;
height: 35px;
${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
}}
`