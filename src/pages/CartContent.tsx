import { CartItem } from "../entities/cartItem/model/CartItem";

export const CartContent = (props: {
        cartItems: CartItem[],
        setForm: React.Dispatch<React.SetStateAction<{
            phone: string;
            address: string;
            agreement: boolean;
        }>>, 
        form: {
            phone: string;
            address: string;
            agreement: boolean;
        },
        submitOrder: React.MouseEventHandler,
        deleteItem: (id: number, size: string) => void
    }) => {
    const {cartItems, setForm, form, submitOrder, deleteItem} = props;
    let agreementChecked = '';

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = event.target;
        if (type === 'checkbox') {
            setForm({...form, [name]: event.target.checked});
        }
        else {
            setForm({...form, [name]: event.target.value});
        }
    }

    return (
        <>
          <section className="cart">
            <h2 className="text-center">Cart</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Size</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => {
                    return (
                        <tr>
                            <td scope="row">{item.key}</td>
                            <td>
                                <a href={"/catalog/" + item.id}>{item.title}</a>
                            </td>
                            <td>{item.size}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.qty * item.price}</td>
                            <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(item.id, item.size)}>Delete</button></td>
                        </tr>
                    )
                })}
                <tr>
                  <td className="text-right">Total</td>
                  <td>
                    {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty * item.price,
                        0,) + '$'} 
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Submit</h2>
            <div className="card">
              <form className="card-body" onSubmit={event => event.preventDefault}>
                <div className="form-group">
                  <label>Phone number</label> 
                  <input 
                    className="form-control" 
                    id="phone" 
                    placeholder="Phone number"
                    name="phone"
                    value={form.phone}
                    onChange={handlerInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Delivery address</label>
                  <input 
                    className="form-control" 
                    id="address" 
                    placeholder="Delivery address"
                    name="address"
                    value={form.address}
                    onChange={handlerInputChange}
                  />
                </div>
                <div className="form-group form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="agreement"
                    name="agreement"
                    checked={form.agreement}
                    onChange={handlerInputChange} 
                  />
                  <label className="form-check-label">Agree with the delivery rules.</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" onClick={submitOrder}>Submit</button>
              </form>
            </div>
          </section>
        </>
    )
}