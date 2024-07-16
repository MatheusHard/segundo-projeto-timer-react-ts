import { FormContainer, MinutesInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";


export function CycleForm() {

    const { activeCycle }  = useContext(CyclesContext)
    const {register} = useFormContext()//aq vc pega o register de um Provider Form

    return (
        <FormContainer>
        <label htmlFor="task">Working em</label>
        <TaskInput 
                id="task"
                list="lista-task"
                placeholder="Nome do Proj"
                //O !! -> caso tenha algum valor, converte pra true:
                disabled={!!activeCycle}
                {...register('task')}
        />
        {/*SUGESTÕES*/}
        <datalist id="lista-task">
            <option>Java</option>
            <option>Flutter</option>
            <option>C#</option>
            <option>React JS</option>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesInput 
                    type="number"
                    id="minutesAmount"
                    //O !! -> caso tenha algum valor, converte pra true:
                    disabled={!!activeCycle}
                    step={1}
                    {...register('minutes', { valueAsNumber: true})}
        />
        <span>minutos.</span>
    </FormContainer>
    )
    
}