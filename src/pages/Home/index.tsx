import { BsFilePlay, BsStop } from "react-icons/bs";
import { ButtonStartContadorContainer,  ButtonStopContadorContainer,  HomeContainer } from "./styles";
import { FormProvider, useForm } from 'react-hook-form'
import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { CountDown } from "./components/countdown";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { CycleForm } from "./components/form_cycle";


interface Cycle {
    id: string
    task: string 
    minutes: number 
    startDate: Date
    iterrutedDate?: Date
    finishedDate?: Date
} 

interface CyclesContextData {
    activeCycle : Cycle | undefined
    activeCycleId : string | null
    amountSecondsPassed: number,
    //Passar função por parametros
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

const newCycleFormValidationSchema = zod.object({

    task: zod.string().min(1, 'Tarefa obrigatória'),
    minutes: zod
             .number()
             .min(1, 'Ciclo min 5 minutos')
             .max(60, 'Maximo 60 min')
});


//forçando o tipo, pra virar uma interface
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> 

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


    const newCycleForm = useForm<NewCycleFormData>({
        //Setando a validação dentro do userForm
        resolver: zodResolver(newCycleFormValidationSchema)
    });
    
    const { handleSubmit, watch, reset } = newCycleForm;

    const activeCycle = cycles.find((c) => c.id === activeCycleId);
   
    function markCurrentCycleAsFinished() {
    
        setCycles((state) => state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return { ...cycle, finishedDate: new Date()}
            }else{
                return cycle
            }
        }),                    
        )
    }

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
        setAmountSecondsPassed(0)
        
        reset();
    }
    function handleInteruptedCycle() {
       
        //Caso o id seja igual, interrope o ciclo e colcoa a data da interrupção
        setCycles((state) =>  state.map((cycle) => {
            if(cycle.id === activeCycleId){
                return {...cycle, iterrutedDate: new Date()}
            }else {
                return cycle
            }
        }),
        )
        setActiveCycleId(null)
    }
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    const task = watch('task');
    const isSubmitValid = !task;
   
     return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                {/*Passando Context:*/}
                <CyclesContext.Provider 
                    value={{
                        activeCycle,
                        activeCycleId,
                        amountSecondsPassed,
                        markCurrentCycleAsFinished,
                        setSecondsPassed}}>
                    {/*Form tem seu proprio Context:*/}
                    <FormProvider { ...newCycleForm }>{/*Passar o register pelo Provider*/}
                        <CycleForm/>
                    </FormProvider>
                    <CountDown/>
                </CyclesContext.Provider>
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