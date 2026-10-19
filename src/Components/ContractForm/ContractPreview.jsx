import { useForm } from "../../Hooks/useForm";
import { formatDate } from "../../utils/dates";
import { translations } from "../../i18n/translations";

export function ContractPreview() {
  const { values } = useForm();
  const lang = values.lang || "en";
  const t = translations[lang].contract;

  return (
    <div className="doc" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      
      {/**Contract Header */}
      <header className="doc-header">
        <div>
          <h1 className="doc-title">{t.title}</h1>
          <p className="doc-number">{t.number} <bdi>{values.contractNumber}</bdi></p>
        </div>
        <div className="doc-meta">
          <p><span>{t.date}</span><bdi>{formatDate(values.contractDate)}</bdi></p>
        </div>
      </header>

      {/**Contract Parties */}
      <section className="doc-parties">
        <div>
          <h4 className="doc-label">{t.partyA}</h4>
          <p className="doc-strong">{values.contractProvider || "—"}</p>
        </div>
        <div>
          <h4 className="doc-label">{t.partyB}</h4>
          <p className="doc-strong">{values.contractClient || "—"}</p>
        </div>
      </section>

        {/**Scope Of Work */}
      <section className="doc-section">
        <h4>{t.scope}</h4>
        <p className="doc-pre">{values.scopeOfWork || "—"}</p>
      </section>

        {/**Payment Terms */}
      {values.paymentTerms && (
        <section className="doc-section">
          <h4>{t.payment}</h4>
          <p className="doc-pre">{values.paymentTerms}</p>
        </section>
      )}

      {/**Termination Terms */}
      {values.terminationClause && (
        <section className="doc-section">
          <h4>{t.termination}</h4>
          <p className="doc-pre">{values.terminationClause}</p>
        </section>
      )}

      {/**Signatures */}
      <div className="doc-signatures">
        <div className="sig-line">{values.contractProvider || t.partyA}</div>
        <div className="sig-line">{values.contractClient || t.partyB}</div>
      </div>
    </div>
  );
}