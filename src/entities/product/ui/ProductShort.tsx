import { Product } from "../model/Product"

export const ProductShort = (props: {product: Product}) => {
    const {product} = props;
    return (
        <div className="col-4" id={product.id.toString()}>
            <div className="card catalog-item-card">
                <img src={product.images[0]}
                    className="card-img-top img-fluid" alt={product.title}/>
                <div className="card-body">
                    <p className="card-text">{product.title}</p>
                    <p className="card-text">{product.price}</p>
                    <a href={"/catalog/" + product.id} className="btn btn-outline-primary">Заказать</a>
                </div>
            </div>
        </div>
    )
}