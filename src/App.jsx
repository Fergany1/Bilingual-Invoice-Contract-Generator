import { useState } from 'react'
import './App.css'
import { ContextProvider } from './Hooks/useForm'
import InvoiceForm from './InvoiceForm'
import TestForm from './SandBoxTest/SandBox'
import ServicesDetails from './InvoiceForm/ServicesDetails'

function App() {
  const initialInvoiceValues = {
    // Provider Info
    providerName: '' ,
    providerAddress: '' ,
    providerEmail: '' ,
    serviceCategory: '' , 
    hourlyRate: '',

    // Client Info
    clientName: '' , 
    shippingAddress: '' , 
    clientEmail: '' ,

    // Table Array Field
    items: [
      {id: 1 ,description: '' , quantity: 1 , price: 0}
    ],

    // Time and date
    serviceDate: '',
    serviceTime: '',
    techinician: '',

    // Total Price For Services
    totalPrice: ''
  };
  return (
    <>
      {/* <InvoiceForm /> */}
      <ContextProvider initialValue={initialInvoiceValues}>
        <InvoiceForm />
      </ContextProvider>
    </>
  )
}

export default App
