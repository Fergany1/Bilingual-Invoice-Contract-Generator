import { useState } from 'react'
import { ContextProvider } from './Hooks/useForm'
import ContractForm from './Components/ContractForm/ContractForm'
import InvoiceForm from './Components/InvoiceForm/InvoiceForm'


function App() {
  // 1. Tab state to switch views on screen
  const [currentTab, setCurrentTab] = useState('invoice');

  // Your existing completed invoice state shape
  const initialInvoiceValues = {
    
    //Invoice Fixed Info
    invoiceNumber: 1, issueDate: '',
    dueDate: 14, currency:'EGP',

    // Provider Info
    providerName: '',providerNumber: '', providerAddress: '', providerEmail: '',
    serviceDescription: '', 
    
    // Client Info
    companyName: '',
    clientName: '', clientNumber: '', shippingAddress: '',
    clientEmail: '',

    // Table-Services Info
    items: [{ 
      id: 1, title:'' , description: '',
      quantity: 1, price: 0 ,
      unit: 'hour' , 
    }],

    // Totals Settings
    taxRate: 14,    
    discount: 0,
    amountPaid: 0,

    // Payment
    paymentMethod: '', paymentDetails: '' , notes:'',

    // Languages
    lang: 'en',
    
  };

  // 2. Your NEW contract state shape (Completely flat, no tables needed!)
  const initialContractValues = {
    contractNum: 1,
    contractDate: '',
    contractProvider: '',
    contractClient: '',
    scopeOfWork: '',
    paymentTerms: '',
    terminationClause: '',
    isAgreed: false, // Checkbox boolean
    lang: 'en',
  };

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Document Generator</h1>
        <p>Create Bilingual Invoices & Contracts, Then Print , Download Or Share Them.</p>
      </header>
      
      {/* Tab Navigation Buttons */}
      <nav className='tabs'>
        <button 
          type='button'
          className={currentTab === 'invoice' ? 'tab active' : 'tab'}
          onClick={() => setCurrentTab('invoice')}
        >
          Invoice 
        </button>
        <button 
          type='button'
          className={currentTab === 'contract' ? 'tab active' : 'tab'}
          onClick={() => setCurrentTab('contract')}
        >
          Contract 
        </button>
      </nav>

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