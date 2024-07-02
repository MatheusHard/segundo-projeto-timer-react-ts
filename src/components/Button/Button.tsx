import { IButton } from "../interfaces/IButton";
import { ButtonContainer } from "./Button.styles";

export function Button({variant = 'sucess'}: IButton) {

    return (
        <>
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
        </>
    )
    
}