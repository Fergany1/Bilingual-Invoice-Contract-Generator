import { useForm } from '../Hooks/useForm'; // Assuming your hook is in useForm.js

export default function TestForm() {
  // 1. Initialize the state with flat values and one array (items)
  const {
    values,
    handleChange,
    handleTableChange,
    addTableRow,
    removeTableRow,
    resetForm,
  } = useForm({
    customerName: '',
    isVip: false,
    items: [{ productName: '', quantity: 1 }] // 'items' is our arrayName
  });

  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '20px' }}>
      {/* LEFT SIDE: THE FORM */}
      <div style={{ flex: 1 }}>
        <h2>New Order</h2>
        
        {/* Testing handleChange (Flat State) */}
        <div>
          <label>
            Customer Name:
            <input
              type="text"
              name="customerName" // MUST match the state key
              value={values.customerName}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              name="isVip"
              checked={values.isVip}
              onChange={handleChange}
            />
            VIP Customer?
          </label>
        </div>

        <hr />
        <h3>Products</h3>

        {/* Testing addTableRow */}
        <button 
          onClick={() => addTableRow('items', { productName: '', quantity: 1 })}
          type="button"
        >
          + Add Product Row
        </button>

        {/* Testing handleTableChange & removeTableRow */}
        {values.items.map((item, index) => (
          <div key={index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
            <input
              type="text"
              name="productName" // MUST match the object key in the array
              placeholder="Product Name"
              value={item.productName}
              onChange={(e) => handleTableChange(index, 'items', e)}
            />
            
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleTableChange(index, 'items', e)}
            />
            
            <button onClick={() => removeTableRow('items', index)} type="button">
              Remove
            </button>
          </div>
        ))}

        <hr />
        <button onClick={resetForm} type="button">Reset Entire Form</button>
      </div>

      {/* RIGHT SIDE: THE REAL-TIME STATE VIEWER */}
      <div style={{ flex: 1, backgroundColor: '#1e1e1e', color: '#00ff00', padding: '20px', borderRadius: '8px' }}>
        <h3>Live State:</h3>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
}