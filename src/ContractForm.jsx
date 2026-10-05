import { useForm } from "./Hooks/useForm";

export default function ContractForm() {
    const { values , handleChange } = useForm()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Final Contract Form Payload Collected:", values);
    }

     return (
        <div>
            <h2>Create Legal Contract</h2>
            
            <form onSubmit={handleSubmit}>
                {/* 1. Basic Metadata Fields */}
                <div>
                    <div>
                        <label>Contract Date</label>
                        <input 
                            type="date" 
                            name="contractDate" 
                            value={values.contractDate} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Service Provider (Party A)</label>
                        <input 
                            type="text" 
                            name="contractProvider" 
                            value={values.contractProvider} 
                            onChange={handleChange} 
                            placeholder="Company / Provider Name"
                        />
                    </div>
                </div>

                <div>
                    <label>Client Name (Party B)</label>
                    <input 
                        type="text" 
                        name="contractClient" 
                        value={values.contractClient} 
                        onChange={handleChange} 
                        placeholder="Full Client Name"
                    />
                </div>

                {/* 2. Heavy Content Areas (Textareas) */}
                <div>
                    <label>Scope of Work & Services Details</label>
                    <textarea 
                        name="scopeOfWork" 
                        value={values.scopeOfWork} 
                        onChange={handleChange} 
                        placeholder="Describe the exact project parameters and deliverables..."
                        rows="5"
                    />
                </div>

                <div>
                    <label>Payment Terms & Milestones</label>
                    <textarea 
                        name="paymentTerms" 
                        value={values.paymentTerms} 
                        onChange={handleChange} 
                        placeholder="Ex: 50% upfront deposit, 50% upon completion..."
                        rows="3"
                    />
                </div>

                {/* 3. Checkbox Validation */}
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            name="isAgreed" 
                            checked={values.isAgreed} 
                            onChange={handleChange} 
                        />
                        I certify that these contract clauses are binding and correct.
                    </label>
                </div>

                <button>
                    Generate Legal Contract
                </button>
            </form>
        </div>
    );
}