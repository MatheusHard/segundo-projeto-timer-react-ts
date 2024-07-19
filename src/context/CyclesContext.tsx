import { useState, createContext, ReactNode, useReducer } from "react"
import { v4 as uuidv4 } from 'uuid';

interface CreateCycleData {
    task: string
    minutes: number
}


interface Cycle {
    id: string
    task: string 
    minutes: number 
    startDate: Date
    iterrutedDate?: Date
    finishedDate?: Date
} 

interface CyclesContextData {
    cycles: Cycle[]
    activeCycle : Cycle | undefined
    activeCycleId : string | null
    amountSecondsPassed: number,
    //Passar função por parametros
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    handleInteruptedCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)
//Pegar qualqeur tipo de HTML
interface CyclesContextProviderProps {
    children: ReactNode
}

interface CycleState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function CyclesContextProvider({ children } : CyclesContextProviderProps) {

    //const [cycles, setCycles] = useState<Cycle[]>([]) com useState
    
    const [ cyclesState, dispatch ] = useReducer((state: CycleState, action: any) => {

    switch (action.type) {
        //Ao criar novo Cronometro:
        case 'ADD_CYCLE':
            return {
                    ...state, 
                    cycles: [...state.cycles, action.payload.newCycle],
                    activeCycleId: action.payload.newCycle.id,
                }
        //Ao para o Cronometro:        
        case 'INTERRUPT_CYCLE':
            return {
                ...state,
                cycles:  state.cycles.map((cycle) => {
                    if(cycle.id === state.activeCycleId){
                        return {...cycle, iterrutedDate: new Date()}
                    }else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        case 'MARK_CYCLE_FINISH':
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if(cycle.id === state.activeCycleId){
                        return {...cycle, finishedDate: new Date()}
                    }else {
                        return cycle
                    }
                }),
                activeCycleId: null
            }
        default:
            return state;
    }
        
    }, {
        cycles: [],
        activeCycleId: null
    })

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0)
    const { cycles, activeCycleId} = cyclesState;

    const activeCycle = cycles.find((c) => c.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
      //Nova forma -> Reduce
      dispatch({
        type: 'MARK_CYCLE_FINISH',
        payload: {
            activeCycleId
        },
    })
    }

    function createNewCycle(data: CreateCycleData){ 
        
        const id = String(uuidv4());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutes: data.minutes,
            startDate: new Date()
        }

        //Forma antiga:
        //setCycles((state) => [...state, newCycle])//Spread na lista com novo cycle
        
        //Nova forma -> Reduce
        dispatch({
            type: 'ADD_CYCLE',
            payload: {
                newCycle
            },
        })
        setAmountSecondsPassed(0)
        
        //reset();
    }

    function handleInteruptedCycle() {
      
        dispatch({
            type: 'INTERRUPT_CYCLE',
            payload: {
                activeCycleId
            },
        })//Nova forma
        //Caso o id seja igual, interrope o ciclo e colcoa a data da interrupção
       /* setCycles((state) => 
        )*/
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                createNewCycle,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                handleInteruptedCycle        
            }}>
            { children }
        </CyclesContext.Provider>
    )
}
