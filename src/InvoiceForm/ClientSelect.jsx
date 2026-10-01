import { useEffect, useState } from "react";
import { useForm } from '../UseForm/useForm'
 

const ProviderForm = () => {
    const { formData , onChange  , } = useForm({
        name: '' , address: '' , email: '' , serviceCategory: '' , hourlyRate: ''
    })
    

    const handleSubmit = (e) => {
        e.preventDefualt();
        console.log('Saving Prodvider Data : ' , formData)

    }
    

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <h2>From : Provider</h2>
                <input type="text" onChange={onChange} name="name" placeholder="Full Name ..." />
                <input type="text" onChange={onChange} name="address" placeholder="Address ..." />
                <input type="text" onChange={onChange} name="email" placeholder="Email ..." />
                <textarea name="serviceCategory" onChange={onChange} placeholder="Service Details ..."></textarea>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

const ClientForm = () => {
    const { formData , onChange  , saved} = useForm({
        name: '' , shippingAddress: '' , email: '' 
    })
    
    
    const handleSubmit = (e) => {
        e.preventDefualt();
        console.log('Saving Client Data : ' , formData)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Bill To : Client</h2>
                <input type="text" onChange={onChange} name="name" placeholder="Full Name ..." />
                <input type="text" onChange={onChange} name="email" placeholder="Email ..." />
                <textarea type="text" onChange={onChange} value="shippingAddress" placeholder="Address Details ..." />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default function ClientSelect() {
    const [ user , setUser ] = useState('Provider')
    
    return (
        <div>
                <button onClick={() => setUser('Provider')}>Service Provider</button>
                <button onClick={() => setUser('Client')}>Client</button>
                {/* Conditional Rendering For Client & Provider */}
                {user === 'Provider' ? <ProviderForm /> : <ClientForm />}
            </div>

        )

}
     

