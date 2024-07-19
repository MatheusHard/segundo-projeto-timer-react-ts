import { BsFilePlay, BsStop } from "react-icons/bs";
import { ButtonStartContadorContainer,  ButtonStopContadorContainer,  HomeContainer } from "./styles";
import { FormProvider, useForm } from 'react-hook-form'
import {  useContext } from "react";
import { CountDown } from "./components/countdown";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { CycleForm } from "./components/form_cycle";
import { CyclesContext } from "../../context/CyclesContext";





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
   
    const {activeCycle, createNewCycle, handleInteruptedCycle } =  useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        //Setando a validação dentro do userForm
        resolver: zodResolver(newCycleFormValidationSchema)
    });
    
    const { handleSubmit, watch , reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }
  
    const task = watch('task');
    const isSubmitValid = !task;
   
     return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                {/*Passando Context:*/}
               
                    {/*Form tem seu proprio Context:*/}
                    <FormProvider { ...newCycleForm }>{/*Passar o register pelo Provider*/}
                        <CycleForm/>
                    </FormProvider>
                    <CountDown/>
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