import { useContext } from "react";
import { HistoryContainer, HistoryTableList, StatusTask } from "./styles";
import { CyclesContext } from "../../context/CyclesContext";
import { ptBR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

export function History() {

    const { cycles } = useContext(CyclesContext)

    console.log('Cicros', cycles)
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
                      {cycles.map(cycle => {
                        return (
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutes} min</td>
                                <td>{formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                        locale: ptBR
                                        }
                                    
                                )}</td>
                                <td>
                                    {
                                      cycle.finishedDate && (<StatusTask statusColor="green">Concruidio</StatusTask>)
                                    }
                                    {
                                      cycle.iterrutedDate && (<StatusTask statusColor="red">Parado</StatusTask>)
                                    }
                                    {
                                      !cycle.finishedDate && !cycle.iterrutedDate && (<StatusTask statusColor="yellow">Andamentio</StatusTask>)
                                    }
                                    
                                </td>
                            </tr>
                        )
                      })}
                       
                    </tbody>
                </table>
            </HistoryTableList>
        </HistoryContainer>
         )
}