import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { Product } from "../entities/product/model/Product";
import { ProductShort } from "../entities/product/ui/ProductShort";
import { CategoryMenu } from "../widgets/CategoryMenu";
import { Search } from "../widgets/Search";

export const CatalogContent = (props: {
    main: boolean,
    activeCategory: number,
    categories: any, 
    products: Product[], 
    filterProducts: any,
    loadMore: any,
    curOffset: number,
    searchSubmit: any,
    setSearchForm: any,
    searchForm: any
}) => {

    const {main, activeCategory, categories, products, filterProducts, loadMore, curOffset, searchSubmit, setSearchForm, searchForm} = props;
    let loadHidden = '';

    if (products.length < 6) {
        loadHidden = ' hidden';
    }

    const searchHidden = main;

    return (
        <>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <Search searchHidden={searchHidden} searchSubmit={searchSubmit} setSearchForm={setSearchForm} searchForm={searchForm}/>

                <CategoryMenu activeCategory={activeCategory} categories={categories} filterProducts={filterProducts}/>
                
                <div className="row">
                    {products.map((item: Product) => {
                        return (
                            <ProductShort product={item}/>
                        )
                    })}
                </div>
                <div className="text-center">
                    <button className={"btn btn-outline-primary" + loadHidden} onClick={() => loadMore(6 * curOffset)}>Загрузить ещё</button>
                </div>
            </section>
        </>
    )
}