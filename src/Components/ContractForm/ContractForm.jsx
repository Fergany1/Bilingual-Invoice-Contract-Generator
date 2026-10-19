import { useForm } from "../../Hooks/useForm";
import { useRef } from "react";
import { ContractPreview } from "./ContractPreview";
import { DocumentActions } from "../Shared/DocumentActions";
import { validateContract } from "../../utils/validateContract";
import { buildContractMessage } from "../../utils/whatsapp";

export default function ContractForm() {
    const { values , handleChange } = useForm()
    const printRef = useRef(null)


     return (
        <div className="card">
            <h2>Create Legal Contract</h2>
            
            <form className="fields" onSubmit={(e) => e.preventDefault()}>
                {/* 1. Basic Metadata Fields */}
                <div>
                    <label>
                        Document Language
                        <select name="lang" value={values.lang} onChange={handleChange}>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                        </select>
                    </label>
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
                <div>
                    <label>Termination Clause</label>
                    <textarea
                        name="terminationClause"
                        value={values.terminationClause}
                        onChange={handleChange}
                        placeholder="Ex: Either party may terminate with 7 days' written notice. Work completed up to that date will be paid for..."
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

            </form>
            <DocumentActions
                targetRef={printRef}
                fileName={`contract-${values.contractNumber}`}
                validate={() => validateContract(values)}
                buildMessage={(client) =>
                    buildContractMessage({
                    clientName: client.name,
                    providerName: values.contractProvider,
                    })
                }
                />
            <section className="preview-card">
                <h2>Preview</h2>
                <div className="print-area" ref={printRef}>
                    <ContractPreview />
                </div>
            </section>
        </div>
    );
}