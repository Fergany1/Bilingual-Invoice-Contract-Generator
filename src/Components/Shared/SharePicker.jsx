import { useClients } from "../../Hooks/useClients";

export function SharePicker({ onPick , onClose }) {
    const { clients } = useClients();

    return (
        <div className="picker card">
            <h3>Send to...</h3>
            {clients.length === 0 && <p>No Saved Clients Yet.</p>}
            <ul>
                {clients.map((c) =>( 
                    <li key={c.id}>
                        <button type="button" onClick={() => onPick(c)}>
                            {c.name} {c.company && `(${c.company})`}
                        </button>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={onClose}>
                Cancel
            </button>
        </div>
    )
}