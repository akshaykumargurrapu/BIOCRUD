import React, { createContext, useState } from "react";

export const dataContext = createContext()

const DataProvider = ({children})=>{
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hobbies,setHobbies] = useState([]);
    const [tShirt, settShirt] = useState('');
    const [height,setHeight] = useState('');
    const [weight,setWeight] = useState('');
    const [linkedin, setLinkedin] = useState('')
    const [company, setCompany] = useState('')
    const [skills, setSkills] = useState([])
    const [work, setWork] = useState([])
    return(
        <dataContext.Provider value={[name, setName, email, setEmail,
            password, setPassword, hobbies, setHobbies, tShirt, settShirt,
            height,setHeight, weight,setWeight, linkedin, setLinkedin,
            company, setCompany, skills, setSkills, work, setWork]}>
            {children}
        </dataContext.Provider>
    )
}

export default DataProvider;