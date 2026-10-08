import { useForm } from "../Hooks/useForm";

export default function ServiceDetails() {
    const {
        values ,
        addTableRow,
        removeTableRow,
        handleTableChange,
        handleChange,
    } = useForm();


    return(
        <div>
        {/* SECTION A: SERVICE DETAILS DATA */}
        <div>
            <h2>Services Details</h2>
            <label>
                <p>Date: </p>
                <input
                type="date"
                value={values.serviceDate}
                name="serviceDate"
                onChange={handleChange}
                placeholder="Date DD/MM/YYYY"></input>
            </label>
            <label>
                <p>Time: </p>
                <input
                name="serviceTime"
                onChange={handleChange}
                value={values.serviceTime}
                placeholder="MM:HH:AM-MM:HH:AM"
                ></input>
            </label>
            <label>
                <p>Techinician: </p>
                <input
                name="technician"
                onChange={handleChange}
                value={values.technician}
                placeholder="U Name ..."></input>
            </label>
        </div>

        {/* SECTION B: ITEMIZATION DYNAMIC TABLE */}
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
                    {values.items.map((item , index) => 

                        <tr key={item.id}>
                            <td>
                                <strong>
                                    {index+1}
                                </strong>
                            </td>

                            <td>
                                <input type="text" 
                                placeholder="Title" 
                                name="title"
                                value={item.title}
                                onChange={(e) => handleTableChange('items' , index , e)} />

                            </td>
                            <td>
                                <textarea type="text" 
                                placeholder="Service Details ..." 
                                value={item.description}
                                name="description"
                                onChange={(e) => handleTableChange('items' , index , e)} />

                            </td>
                            <td>
                                <input type="text" 
                                placeholder="Quantity ..." 
                                value={item.quantity}
                                name="quantity"
                                onChange={(e) => handleTableChange('items' , index , e)} />

                            </td>

                            <td>
                                <input type="text" 
                                placeholder="Price ..." 
                                value={item.price}
                                name="price"
                                onChange={(e) => handleTableChange('items' , index , e)} />

                            </td>

                            <td>

                                <button 
                                type="button"
                                onClick={() => removeTableRow('items' , index)}
                                disabled={values.items.length === 1}
                                   >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    )}                
                </tbody>
            </table>
                    <button
                    type="button"
                    onClick={() => addTableRow
                        ('items' ,
                        {id: Date.now() ,description: '' , quantity: 1 , price: 0})
                    }
                    >Add</button>
        </div>
    )
}