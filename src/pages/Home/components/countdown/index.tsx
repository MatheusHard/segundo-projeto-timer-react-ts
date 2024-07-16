import { useContext, useEffect } from "react";
import { CronometroContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../..";

interface CountDownProps {
    activeCycle: any
    setCycles: any
    activeCycleId: any
}


export function CountDown() {

    const { 
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished, 
        amountSecondsPassed,
        setSecondsPassed
     } = useContext(CyclesContext)
    const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0

    useEffect(() => {
        let interval : number;

        if (activeCycle) {
          interval = setInterval(() => {
           
            const secondsDiff = differenceInSeconds(new Date(), activeCycle.startDate);

            if(secondsDiff >= totalSeconds){
                
                markCurrentCycleAsFinished(); //função vinda da Home
                //Esta função veio pelos parametros, da Home:
                setSecondsPassed(totalSeconds)//para ao finalizar, não ficar com 01, e sim 00
                clearInterval(interval)
            }else{
                setSecondsPassed(secondsDiff)
            }
          }, 1000)
        }
        return () => {
                clearInterval(interval)
            }
      }, [
        activeCycle,
        totalSeconds,
        activeCycleId,
        markCurrentCycleAsFinished,
        setSecondsPassed
      ])

      const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    //Floor usado para não da numero quebrado:
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(()=>{
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])
    return (
        <CronometroContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CronometroContainer>
    )
    
}