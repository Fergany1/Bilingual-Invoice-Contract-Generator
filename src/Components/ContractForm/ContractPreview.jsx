import { useForm } from "../../Hooks/useForm"
import { translations } from "../../i18n/translations";

export function ContractPreview(){

    const { values } = useForm();
    const lang = values.lang || "en";
    const t = translations[lang].contract;

    return (
        <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
            <p> {t.number} {values.contractNum}</p>
            <h2>{t.title}</h2>
            <p>{t.date} {values.contractDate || "--/--/----"}</p>

            {/* Parties Context */}
            <div>
                <div>
                    <h4>{t.partyA}</h4>
                    <p>{values.contractProvider || '---------'}</p>
                </div>
                <div>
                    <h4>{t.partyB}</h4>
                    <p>{values.contractClient || '----------'}</p>

                </div>
            </div>
            {/**Contract Content */}
            <div>
                <h4> {t.scope}</h4>
                <p style={{ whiteSpace: "pre-line"}}>{values.scopeOfWork}</p>
            </div>

            {/**Payment Terms */}
            {values.paymentTerms && (
            <>
                <h4>{t.payment}</h4>
                <p style={{ whiteSpace: "pre-line" }}>{values.paymentTerms}</p>
            </>
            )}

            {/**Termination Clause */}
            {values.terminationClause && (
            <>
                <h4> {t.termination} </h4>
                <p style={{ whiteSpace: "pre-line" }}>{values.terminationClause}</p>
            </>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 48 }}>
                <div>
                <div style={{ borderTop: "1px solid #000", width: 180 }} />
                <p>{values.contractProvider || t.partyA }</p>
                </div>
                <div>
                <div style={{ borderTop: "1px solid #000", width: 180 }} />
                <p>{values.contractClient || t.partyB }</p>
                </div>
            </div>
        </div>
    )
}