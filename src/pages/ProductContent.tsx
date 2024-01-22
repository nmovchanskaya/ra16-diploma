import { Product } from "../entities/product/model/Product"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRequest } from "../shared/api/createRequest";
import { Size } from "../entities/size/model/Size";

export const ProductContent = (props: {
    product: Product, 
    setProduct: React.Dispatch<any>, 
    addToCart: (id: number, title: string, size: string, price: number, qty: number) => void
}) => {

    const {product, setProduct, addToCart} = props;
    const params = useParams();
    const url  = 'http://localhost:7070/api/items/';
    const [selectedSize, setSelectedSize] = useState('');
    const [curQty, setCurQty] = useState(1);
    let hidden = '';
    const navigate = useNavigate();

    useEffect(() => {
        //get item from server
        if (params.id) {
            const resp = createRequest({
                url: `${url}${params.id}`, 
                sendMethod: 'GET', 
                callback: (data) => {
                    setProduct(data);
                }
            })
        }
    }, [params.id]);

    if (!selectedSize) {
        hidden = ' hidden';
    }
    if (product) {
        let sizes = product.sizes.filter((item: Size) => item.available === true);
        return (
            <>
                <section className="catalog-item">
                    <h2 className="text-center">{product.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={product.images[0]} className="img-fluid" alt=""/>
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{product.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{product.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{product.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{product.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{product.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{product.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: 
                                    {sizes.map((item: Size) => {
                                        let selected = '';
                                        if (item.size === selectedSize) {
                                            selected = ' selected';
                                        }
                                        return (
                                            <span className={"catalog-item-size" + selected} onClick={() => setSelectedSize(item.size)}>{item.size}</span>
                                        )
                                    })}
                                </p>
                                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary" onClick={() => setCurQty(curQty-1)}>-</button>
                                        <span className="btn btn-outline-primary">{curQty}</span>
                                        <button className="btn btn-secondary" onClick={() => setCurQty(curQty+1)}>+</button>
                                    </span>
                                </p>
                            </div>
                            <button className={"btn btn-danger btn-block btn-lg" + hidden} onClick={() => {
                                addToCart(product.id, product.title, selectedSize, product.price, curQty);
                            }}>В корзину</button>
                        </div>
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}