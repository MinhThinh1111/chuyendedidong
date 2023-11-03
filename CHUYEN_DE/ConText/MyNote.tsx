import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState ,useContext} from "react";

const NoteContext = createContext<any>('')

const MyNote = ({children}:any) => {
    const [IsNote,SetNote] = useState({})
    const [IsVeXe,SetVeXe] = useState([])

    const getNote = async () => {
        const result = await AsyncStorage.getItem('Account')
        if(result !== null) {
            SetNote(JSON.parse(result)) 
        }    
    }
    const getChuyenDi = async () => {
        const result = await AsyncStorage.getItem('VeXe')
        if(result !== null) {
            SetVeXe(JSON.parse(result))
        }
    }
    useEffect(()=>{ 
        getChuyenDi();   
        getNote()      
    },[])
    return(
        <NoteContext.Provider value={{IsNote,SetNote,getNote,getChuyenDi,IsVeXe,SetVeXe}} >
            {children}
        </NoteContext.Provider>
    )
}
export const useNotes =()=> useContext(NoteContext);
export default MyNote
