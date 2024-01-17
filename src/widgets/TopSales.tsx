import { Product } from "../entities/product/model/Product";
import { ProductShort } from "../entities/product/ui/ProductShort";

export const TopSales = (props: {topSales: any}) => {

    const {topSales} = props;

    if (topSales) {
        return (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {/* <div className="preloader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}
                <div className="row">
                    {topSales.map((item: Product) => {
                        return (
                            <ProductShort product={item}/>
                        )
                    })}
                </div>
            </section>
        )
    }
    else {
        return (
            <></>
        )
    }
}
