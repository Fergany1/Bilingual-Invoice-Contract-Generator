import { useEffect, useState } from "react";

export function useClients() {
    const [ clients , setClients ] = useState(() => {
        try {return JSON.parse(localStorage.getItem('saved_clients')) || []; }
        catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem('saved_clients' , JSON.stringify(clients));
    } , [clients]);

    const addClient = (c) => {
        setClients((prev) =>
            prev.some((x) => x.phone === c.phone)
            ? prev
            : [...prev , {id: Date.now()  , ...c}])
    };
    const removeClient = (id) => {setClients((prev) => prev.filter((c) => c.id !== id));}

    return { clients , addClient , removeClient};
}