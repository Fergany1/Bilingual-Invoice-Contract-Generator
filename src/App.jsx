import { useState } from 'react'
import { ContextProvider } from './Hooks/useForm'
import ContractForm from './ContractForm'
import InvoiceForm from './InvoiceForm'


function App() {
  // 1. Tab state to switch views on screen
  const [currentTab, setCurrentTab] = useState('invoice');

  // Your existing completed invoice state shape
  const initialInvoiceValues = {
    providerName: '', providerAddress: '', providerEmail: '', serviceCategory: '', hourlyRate: '',
    clientName: '', shippingAddress: '', clientEmail: '',
    items: [{ id: 1, description: '', quantity: 1, price: 0 }],
    serviceDate: '', serviceTime: '', techinician: '', totalPrice: ''
  };

  // 2. Your NEW contract state shape (Completely flat, no tables needed!)
  const initialContractValues = {
    contractDate: '',
    contractProvider: '',
    contractClient: '',
    scopeOfWork: '',
    paymentTerms: '',
    terminationClause: '',
    isAgreed: false // Checkbox boolean
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Document Generator Platform</h1>
      
      {/* Tab Navigation Buttons */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentTab('invoice')}
          style={{ backgroundColor: currentTab === 'invoice' ? '#007bff' : '#ccc', color: 'white' }}
        >
          Invoice Generator
        </button>
        <button 
          onClick={() => setCurrentTab('contract')}
          style={{ backgroundColor: currentTab === 'contract' ? '#007bff' : '#ccc', color: 'white' }}
        >
          Contract Generator
        </button>
      </div>

      {/* Render the forms inside their own isolated Context Providers */}
      {currentTab === 'invoice' ? (
        <ContextProvider initialValue={initialInvoiceValues} storageKey="saved_invoice_data">
          <InvoiceForm />
        </ContextProvider>
      ) : (
        <ContextProvider initialValue={initialContractValues} storageKey="saved_contract_data">
          <ContractForm />
        </ContextProvider>
      )}
    </div>
  )
}

export default App