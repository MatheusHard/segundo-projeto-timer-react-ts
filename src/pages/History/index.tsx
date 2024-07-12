import { HistoryContainer, HistoryTableList, StatusTask } from "./styles";

export function History() {
    return (
        <HistoryContainer>
            <h1>History</h1>
            <HistoryTableList>
                <table>
                    {/*Cabeçalho da Table:*/}
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Iniciada</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {/*Corpo da Table:*/}
                    <tbody>
                        <tr>
                            <td>Task 01</td>
                            <td>20 min</td>
                            <td>Há 2 anos</td>
                            <td>
                                <StatusTask statusColor="green">Concluida</StatusTask>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 02</td>
                            <td>10 min</td>
                            <td>Há 2 semans</td>
                            <td>
                                <StatusTask statusColor="yellow">Em Andamento</StatusTask>
                            </td>
                        </tr>
                        <tr>
                            <td>Task 03</td>
                            <td>1 min</td>
                            <td>Há 30 segundos</td>
                            <td>
                                <StatusTask statusColor="red">Pobremas</StatusTask>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryTableList>
        </HistoryContainer>
         )
}