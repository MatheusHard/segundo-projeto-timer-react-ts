import styled from "styled-components";

export const HistoryContainer = styled.main`

    flex: 1;
    padding: 3.5rem;
    
    display: flex;
    flex-direction: column;

    h1{
        font-size: 1.5rem;
        color: ${props => props.theme["gray-100"]};
    }

`

export const HistoryTableList = styled.div`

    flex: 1;
    //caso a tabela seja maior q o container, ira criar uma barra de rolagem, casos => celular
    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        //conta o tamanho de apenas um lado da borda, e nao d todos: 1px, ex
        border-collapse: collapse;
        min-width: 600px;

        th {
            background-color: ${props => props.theme["gray-600"]};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme["gray-100"]};
            font-size: 0.875rem;
            line-height: 1.6;

            //No primeiro th, q tiver muda radio do lado esquerdo:
            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }
            //No ultimo th, q tiver muda radio do lado direito:
            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }
        //Celula de conteudo:
        td {
            background-color: ${props => props.theme["gray-700"]};
            border-top: 4px solid ${props => props.theme["gray-800"]};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;
            
            //Primeiro da linha
            &:first-child {
                width: 50%;//ficar maior, ja q pega frases
                padding-left: 1.5rem;
            }
            //Último da linha
            &:last-child {
                padding-right: 1.5rem;
            } 
        }
    }

`

const STATUS_COLOR = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500'
}

interface StatusTaskProps{
    statusColor: 'yellow' | 'red' | 'green'
}
//recebe por paramentro a cor(StatusTaskProps) q a bolinha vai ser setada:
export const StatusTask = styled.span<StatusTaskProps>`

    display: flex;
    align-items: center;
    gap: 0.5rem;

    //Bolinha do status
    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${props => props.theme[STATUS_COLOR[props.statusColor]]};

    }
`