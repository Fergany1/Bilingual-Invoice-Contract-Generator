
const useForm = (initialValue) => {
    const [ formData , setFormData ] = useState(initialValue) 


    const onChange = (e) => {
        const {name , value } = e.target;
        setFormData((perv) => ({...perv , [name]: value}))
    }
    
    return { formData , onChange}
}  