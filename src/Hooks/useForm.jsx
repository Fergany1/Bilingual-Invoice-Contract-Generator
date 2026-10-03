import { createContext, useContext, useState } from "react"

// 1. Create Channel (BroadCast)
const FormContext = createContext(null)


// 2. Create Logic Func
export function useFormLogics  (initialValue) {
    const [ values , setValues ] = useState(initialValue)
    
    // handle change for inputs (text , options , time , date)
    const handleChange = (e) => {
        const { name , type , value , checked } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    // handle a specific cell in table array
    const handleTableChange = (arrayName , index ,e) => {
        const { name , value } = e.target

        setValues((prev) => {
            const updatedArray = [...prev[arrayName]]
            updatedArray[index] = {
                ...updatedArray[index],
                [name]:value
            }

            return {
                ...prev,
                [arrayName] : updatedArray
            }
        })
    }

    // Adding An Empty Row
    const addTableRow = (arrayName , emptyRowObject) => {
        setValues((prev) => {
            const updateArray = [...prev[arrayName] , emptyRowObject]

            // Testing
            console.log(`---Adding A Row "${arrayName}" ----`);
            console.log(updateArray)

            return {
                ...prev,
                [arrayName]: updateArray
            }
        })
    }

    // Remove a specific Row
    const removeTableRow = (arrayName ,index ) => {
        setValues((prev) => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_,i) => i !== index),
        }))
    }
    
    // Reset Values
    // const resetForm = () => setValues(initialValue)



    return { 
        values , 
        handleChange , 
        handleTableChange ,
        addTableRow,
        removeTableRow,
        // resetForm,
        setValues
    }
}  

// 3. Create Context Provider
export function ContextProvider({ children , initialValue }) {
    const formMethods = useFormLogics(initialValue)
    return (
        <FormContext.Provider value={formMethods}>
            {children}
        </FormContext.Provider>
    )
}

// 4. Create Hook
export function useForm(){
    const Context = useContext(FormContext)
    if (!Context) throw new Error ("Context Error ")
    return Context;
}