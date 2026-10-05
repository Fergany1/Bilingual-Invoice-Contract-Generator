import { useEffect, useState } from "react";
import { useForm } from '../Hooks/useForm'
 

const ProviderForm = ({ onConfirm}) => {
    const { values , handleChange } = useForm()
    

    const handleConfirm = (e) => {
        e.preventDefault();
        console.log('Prodvider Data Ready --- ' , values)

        onConfirm();

    }
    

    return (
        <div>

            <form 
            className="provider-form"
            onSubmit={handleConfirm}>
                <h2>From : Provider</h2>
                <div>
                    <label>
                        <input 
                        type="text" 
                        onChange={handleChange} 
                        name="providerName"
                        value={values.providerName} 
                        placeholder="Full Name ..." />
                    </label>
                </div>

                <div>
                    <label>
                        <input 
                        type="text" 
                        onChange={handleChange} 
                        name="providerAddress" 
                        value={values.providerAddress}
                        placeholder="Address ..." />
                    </label>
                </div>

                <div>
                    <label>
                        <input 
                        type="text" 
                        onChange={handleChange} 
                        name="providerEmail" 
                        value={values.providerEmail}
                        placeholder="Email ..." />
                    </label>
                </div>

                <div>
                    <label>
                        <textarea 
                        name="serviceCategory" 
                        onChange={handleChange} 
                        value={values.serviceCategory}
                        placeholder="Service Details ..."></textarea>
                    </label>
                </div>
                <button type="submit">Confirm </button>
            </form>

        </div>
    )
}

const ClientForm = ({ onConfirm }) => {
    const { values , handleChange } = useForm()
    
    
    const handleConfirm = (e) => {
        e.preventDefault(); // Stop Reloading the Page
        console.log('Client Data --- ' , values)

        // For the Generating Invoice
        if (onConfirm) onConfirm();
    }

    return (
        <div>
            <form onSubmit={handleConfirm}>
                <h2>Bill To : Client</h2>

                <div>
                    <label>
                        <input 
                        type="text" 
                        onChange={handleChange} 
                        name="clientName" 
                        value={values.clientName}
                        placeholder="Full Name ..." />
                    </label>
                </div>

                <div>
                    <label>
                        <input 
                        type="text" 
                        onChange={handleChange} 
                        value={values.clientEmail}
                        name="clientEmail" 
                        placeholder="Email ..." />
                    </label>
                </div>

                <div>
                    <label>
                        <textarea 
                        type="text" 
                        onChange={handleChange} 
                        value={values.shippingAddress} 
                        name="shippingAddress"
                        placeholder="Address Details ..." />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default function ClientSelect() {
    const [ user , setUser ] = useState('Provider')
    
    return (
        <div>
                <button onClick={() => setUser('Provider')}>Provider</button>
                <button onClick={() => setUser('Client')}>Client</button>
                {/* Conditional Rendering For Client & Provider */}
                {user === 'Provider' ? (
                <ProviderForm onConfirm={() => setUser('Client')}/>
            ) : (

                <ClientForm onConfirm={() => console.log("All identity data confirmed! Ready to build document.")}/>
                
                
            )}
            </div>

        )

}
     

