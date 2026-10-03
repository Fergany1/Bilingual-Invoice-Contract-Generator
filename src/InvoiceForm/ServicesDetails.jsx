import useForm from '../Hooks/useForm'
import { use } from 'react'

export default function ServicesDetails(){
    const [ date , setDate ] = useForm()
    const [ time , setTime ] = useForm(time.now())
    const [ name , setName ] = useForm("")

    const handleDate = (e) => {
        e.preventDefualt();
        setDate(e.target.value)
    }
    return(
        <div>
            <h2>Services Details</h2>
            <p>Date: </p>
            <input>{}</input>
            <p>Time: </p>
            <input>{}</input>
            <p>Techinician: </p>
            <input>{}</input>
        </div>
    )
}