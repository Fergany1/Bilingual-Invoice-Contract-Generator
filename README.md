# Bilingual Invoice & Contract Generator

Create professional invoices and service contracts in **English or Arabic** (full right-to-left layout), then **print**, **download as PDF**, or **share on WhatsApp**. Everything runs in the browser, and your data never leaves your device.

**[Live demo](https://fergany1.github.io/Bilingual-Invoice-Contract-Generator/)** · Built with React and Vite

<!-- Replace the paths below with your own screenshots (see docs/screenshots) -->
![Invoice form](docs/screenshots/invoice-form.png)

| Invoice (Arabic) | Contract (Arabic) |
|---|---|
| ![Invoice preview in Arabic](docs/screenshots/invoice-preview-ar.png) | ![Contract preview in Arabic](docs/screenshots/contract-preview-ar.png) |

## Features

**Invoices**
- Line items with title, description, quantity, unit (hour, day, item, project) and price
- Discount, tax rate, amount paid, and balance due, all calculated automatically
- Currencies: EGP, USD, SAR, AED
- Due date calculated from the issue date and payment terms (due on receipt, net 7 / 14 / 30)
- Payment instructions and notes section

**Contracts**
- Parties, scope of work, payment terms, termination clause, and signature lines
- Confirmation checkbox before the contract can be exported

**Both documents**
- English / Arabic output with correct right-to-left layout and the Cairo font
- Print, download PDF, share via WhatsApp, or share the PDF file from a phone
- Saved clients list for one-click sharing
- Validation before export (required fields, valid quantities and prices)
- Drafts autosave in the browser
- Responsive on desktop and mobile

## Tech stack

- **React** (hooks, Context API) and **Vite**
- **html2pdf.js** for PDF generation
- **@fontsource/cairo** for Arabic typography
- Plain CSS with logical properties for RTL support
- Deployed on **GitHub Pages**

## How it works

- **One state container per document.** Each document type gets its own Context provider, saved under its own `localStorage` key, so an invoice and a contract never overwrite each other.
- **Totals in one pure function.** `calculateTotals` takes the line items and settings and returns every number the app needs (line totals, subtotal, discount, tax, total, balance due) with a single rounding helper. The form, the preview, and the PDF all call it, so they can't disagree.
- **Arabic and RTL.** The document wrapper switches `dir` and `lang`, labels come from a translations object, CSS uses logical properties (`start` / `end`), and numbers, dates, and emails are wrapped in `<bdi>` so right-to-left text doesn't reorder them.
- **PDF export.** html2pdf renders the preview element to canvas and places it on A4 pages, so Arabic text keeps its correct letter shapes. It waits for fonts to load before capturing.
- **WhatsApp sharing.** A web page can't send WhatsApp messages by itself. The app opens a `wa.me` chat link with a prefilled message and downloads the PDF to attach. On supported mobile browsers, the **Share PDF** button uses the Web Share API to hand the actual file to WhatsApp.

## Getting started

```bash
git clone https://github.com/Fergany1/Bilingual-Invoice-Contract-Generator.git
cd Bilingual-Invoice-Contract-Generator
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
├── App.jsx
├── InvoiceForm.jsx
├── main.jsx
├── print.css
├── Components/
│   ├── ContractForm/    ContractForm, ContractPreview
│   ├── InvoiceForm/     ClientSelect, ServiceDetails, PaymentDetails,
│   │                    TotalSummary, InvoicePreview
│   └── Shared/          DocumentActions, SharePicker
├── Hooks/               useForm, useClients
├── i18n/                translations
├── styles/              app.css, document.css
└── utils/               calculateTotals, formatMoney, dates, whatsapp,
                         validateInvoice, validateContract
```

## Limitations

- This produces a **printable invoice**, not a tax-authority e-invoice. Businesses with e-invoicing obligations should check their local requirements.
- Contracts are **templates, not legal advice**.
- WhatsApp can't be auto-sent from a web page: the chat opens with the message ready, and you attach the PDF and press Send.
- The PDF is image-based, so its text isn't selectable.
- Data is stored in your browser only. Clearing site data removes drafts and saved clients.
- Only the generated documents are translated. The forms themselves are in English.
- The default tax rate is editable. Always check the correct rate for your case.

## Roadmap

- [ ] Translate the form interface
- [ ] Automatic invoice numbering and invoice history
- [ ] Logo upload and document themes
- [ ] More contract templates
- [ ] Text-based (selectable) PDFs

## Author

**Abdelrhman Fergany**, frontend developer
[GitHub](https://github.com/Fergany1) · [LinkedIn](https://linkedin.com/in/abdelrhmanfergany)
