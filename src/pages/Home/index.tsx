import { BsRecord } from "react-icons/bs";
import { ButtonStartContainer, CronometroContainer, FormContainer, HomeContainer, MinutesInput, Separator, TaskInput } from "./style";

export function Home() {

    return (
        <HomeContainer>
            <form action="">
            <FormContainer>
                    <label htmlFor="task">Working em</label>
                    <TaskInput id="task" list="lista-task" placeholder="Nome do Proj"/>
                    {/*SUGESTÕES*/}
                    <datalist id="lista-task">
                        <option>JAva</option>
                        <option>Flutter</option>
                        <option>C#</option>
                        <option>React JS</option>
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesInput type="number" id="minutesAmount" max={60} min={5} step={5}/>

                    <span>minutos.</span>
                </FormContainer>
                <CronometroContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CronometroContainer>
                <ButtonStartContainer type="submit" disabled>
                    <BsRecord size={24}/>
                    Iniciar
                </ButtonStartContainer>
                </form>
        </HomeContainer>
    )
}