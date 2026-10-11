import { useForm } from "../../Hooks/useForm";
import { addDays } from "../../utils/dates";

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
                {/* The Invoice Date the day the invoice being sent */}
                <p>Issue Date: </p>
                <input
                type="date"
                value={values.issueDate}
                name="issueDate"
                onChange={handleChange}
                placeholder="Date DD/MM/YYYY"></input>
            </label>
            <label>
                <p>Payment Due Date: </p>
                <select
                name="dueDate"
                onChange={handleChange}
                value={values.dueDate}
                >
                    <option value={0}>Due On Receipt</option>
                    <option value={7}>Net 7 Days</option>
                    <option value={14}>Net 14 Days</option>
                    <option value={30}>Net 30 Days</option>
                </select>
            </label>
            <label>
                <p>Currency: </p>
                <select
                name="currency"
                onChange={handleChange}
                value={values.currency}
                >
                    <option value="EGP">EGP</option>
                    <option value="USD">USD</option>
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                </select>
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
                        {id: Date.now() ,description: '' , quantity: 1 , price: 0 , unit: 'hour'})
                    }
                    >Add</button>
        </div>
    )
}