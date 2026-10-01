import { useState } from "react";

export default function LineItemEditor() {
    const [ items , setItems ] = useState([
        {id: Date.now() ,title:"" , description: "" , quantity: "" , price: ""}, 
    ]);

    const onAdd = (e) => {

        setItems((perv) => [...perv , { id:Date.now() ,title:"" , description: "" , quantity: "" , price: ""}])
    }

    const onRemove = (id) => {
        const removedItems = items.filter((item) => item.id !== id);
        setItems(removedItems);
    }

    const onUpdate = (id , field , value) => {
        setItems(perv => 
            perv.map( item =>
                item.id === id ? {...item , [field]: value} : item
            ))
    }

    return(
        <div>
                <h2>Services Provided</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>    
                        <th>Quantity</th>    
                        <th>Price</th>    
                        <th></th>
                    </tr>    
                </thead>
                <tbody>
                    {items.map((item , index) => 

                        <tr key={item.id}>
                            <td>
                                <strong>
                                    {index+1}
                                </strong>
                            </td>

                            <td>
                                <input type="text" 
                                placeholder="Title" 
                                value={item.title}
                                onChange={(e) => onUpdate(item.id , 'title' , e.target.value)} />

                            </td>
                            <td>
                                <textarea type="text" 
                                placeholder="Service Details ..." 
                                value={item.description}
                                onChange={(e) => onUpdate(item.id , 'description' , e.target.value)} />

                            </td>
                            <td>
                                <input type="text" 
                                placeholder="Quantity ..." 
                                value={item.quantity}
                                onChange={(e) => onUpdate(item.id , 'quantity' , e.target.value)} />

                            </td>

                            <td>
                                <input type="text" 
                                placeholder="Price ..." 
                                value={item.price}
                                onChange={(e) => onUpdate(item.id , 'price' , e.target.value )} />

                            </td>

                            <td>

                                <button onClick={() => onRemove(item.id)}>Remove</button>
                            </td>
                        </tr>
                    )}                
                </tbody>
            </table>
                    <button onClick={onAdd}>Add</button>
        </div>
    )
}