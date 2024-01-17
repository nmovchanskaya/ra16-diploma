import { CartItem } from "../entities/cartItem/model/CartItem";

export const CartContent = (props: {
        cartItems: any,
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
        deleteItem: any
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
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
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
                            <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(item.id, item.size)}>Удалить</button></td>
                        </tr>
                    )
                })}
                <tr>
                  <td className="text-right">Общая стоимость</td>
                  {/* colspan="5" */}
                  <td>
                    {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty * item.price,
                        0,) + ' руб.'} 
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card">
              <form className="card-body" onSubmit={event => event.preventDefault}>
                <div className="form-group">
                  <label>Телефон</label> 
                  {/* for="phone" */}
                  <input 
                    className="form-control" 
                    id="phone" 
                    placeholder="Ваш телефон"
                    name="phone"
                    value={form.phone}
                    onChange={handlerInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Адрес доставки</label>
                  {/* for="address" */}
                  <input 
                    className="form-control" 
                    id="address" 
                    placeholder="Адрес доставки"
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
                  <label className="form-check-label">Согласен с правилами доставки</label>
                  {/* for="agreement" */}
                </div>
                <button type="submit" className="btn btn-outline-secondary" onClick={submitOrder}>Оформить</button>
              </form>
            </div>
          </section>
        </>
    )
}