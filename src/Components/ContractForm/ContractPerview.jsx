import { useForm } from "../../Hooks/useForm"

export function ContractPerview(){

    const { values } = useForm()
    return (
        <div >
            <p>Contract-{values.contractNum}</p>
            <h2>Contract Perview</h2>
            
            <div>
                <p>Date: {values.contractDate || "--/--/----"}</p>
            </div>
            {/* Parties Context */}
            <div>
                <div>
                    <h4>(Party A)</h4>
                    <p>{values.contractProvider || '---------'}</p>
                </div>
                <div>
                    <h4>(Party B)</h4>
                    <p>{values.contractClient || '----------'}</p>

                </div>
            </div>
            {/**Contract Content */}
            <div>
                <h4>Service Details</h4>
                <p>{values.scopeOfWork}</p>
            </div>
            {/**Payment Terms */}
            <div>
                <h4>Payment Terms</h4>
                <p>{values.paymentTerms}</p>
            </div>
            {/**Termination Clause */}
            <div>
                <h4>Termination Terms</h4>
                <p>{values.terminationClause}</p>
            </div>
            {/**Signature Block */}
            <div>
                <h4>Signature</h4>
                <p>{values.isAgreed}</p>
            </div>
        </div>
    )
}