import { BsFilePlay, BsRecord, BsStop } from "react-icons/bs";
import { ButtonStartContadorContainer,  ButtonStopContadorContainer,  CronometroContainer, FormContainer, HomeContainer, MinutesInput, Separator, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {  differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, 'Tarefa obrigatória'),
    minutes: zod
             .number()
             .min(5, 'Ciclo min 5 minutos')
             .max(60, 'Maximo 60 min')
});
//forçando o tipo, pra virar uma interface
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> 

interface Cycle {
    id: string
    task: string 
    minutes: number 
    startDate: Date
    iterrutedDate?: Date
} 

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const { register, handleSubmit, watch, formState, reset } = useForm({
        //Setando a validação dentro do userForm
        resolver: zodResolver(newCycleFormValidationSchema)
    });

    const activeCycle = cycles.find((c) => c.id === activeCycleId);

    useEffect(() => {
        if (activeCycle) {
          setInterval(() => {
            setAmountSecondsPassed(
              differenceInSeconds(new Date(), activeCycle.startDate),
            )
          }, 1000)
        }
      }, [activeCycle])


    function handleCreateNewCycle(data: NewCycleFormData){
        
        const id = String(uuidv4());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutes: data.minutes,
            startDate: new Date()
        }

        setActiveCycleId(id)//colocar Id do cycle ativo
        setCycles((state) => [...state, newCycle])//Spread na lista com novo cycle
        reset();
    }
    function handleInteruptedCycle() {
       
        //Caso o id seja igual, interrope o ciclo e colcoa a data da interrupção
        setCycles(
            cycles.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, iterrutedDate: new Date()}
                }else {
                    return cycle
                }
            }),
        )

        setActiveCycleId(null)

    }

    const task = watch('task');
    const isSubmitValid = !task;

    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    //Floor usado para não da numero quebrado:
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')
    
    console.log('cycles', cycles)
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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
                                step={5}
                                {...register('minutes', { valueAsNumber: true})}
                    />
                    <span>minutos.</span>
                </FormContainer>
                <CronometroContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CronometroContainer>
                {/* Verificar c estra ativo ou não: */}
                { !activeCycle ? (
                    <ButtonStartContadorContainer type="submit" disabled={ isSubmitValid } >
                        <BsFilePlay size={24}/>
                        Iniciar
                    </ButtonStartContadorContainer>
                    ) : (
                    <ButtonStopContadorContainer type="button" onClick={handleInteruptedCycle} >
                        <BsStop size={24}/>
                        Parar
                    </ButtonStopContadorContainer>
                )}
                
                </form>
        </HomeContainer>
    )
}