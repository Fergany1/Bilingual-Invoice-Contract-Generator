import { useForm } from "../../Hooks/useForm"

export function ContractPerview(){

    const { values } = useForm()
    return (
        <div>
            <p>CON - {values.contractNum}</p>
            <h2>Service Agreement</h2>
            <p>Date: {values.contractDate || "--/--/----"}</p>

            {/* Parties Context */}
            <div>
                <div>
                    <h4>(Party A) - Provider</h4>
                    <p>{values.contractProvider || '---------'}</p>
                </div>
                <div>
                    <h4>(Party B) - Client</h4>
                    <p>{values.contractClient || '----------'}</p>

                </div>
            </div>
            {/**Contract Content */}
            <div>
                <h4>Service Details</h4>
                <p style={{ whiteSpace: "pre-line"}}>{values.scopeOfWork}</p>
            </div>

            {/**Payment Terms */}
            {values.paymentTerms && (
            <>
                <h4>Payment Terms</h4>
                <p>{values.paymentTerms}</p>
            </>
            )}

            {/**Termination Clause */}
            {values.terminationClause && (
            <>
                <h4>Termination Terms</h4>
                <p>{values.terminationClause}</p>
            </>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
                <div>
                <div style={{ borderTop: "1px solid #000", width: 180 }} />
                <p>{values.contractProvider || "Party A"}</p>
                </div>
                <div>
                <div style={{ borderTop: "1px solid #000", width: 180 }} />
                <p>{values.contractClient || "Party B"}</p>
                </div>
            </div>
        </div>
    )
}