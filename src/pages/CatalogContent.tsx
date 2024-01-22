import { Product } from "../entities/product/model/Product";
import { ProductShort } from "../entities/product/ui/ProductShort";
import { CategoryMenu } from "../widgets/CategoryMenu";
import { Search } from "../widgets/Search";
import { Category } from "../entities/category/model/Category";

export const CatalogContent = (props: {
    main: boolean,
    activeCategory: number,
    categories: Category[], 
    products: Product[], 
    filterProducts: (category: number) => void,
    loadMore: (offset: number) => void,
    curOffset: number,
    searchSubmit: (event?: any) => void,
    setSearchForm: (value: React.SetStateAction<{
        text: string;
    }>) => void,
    searchForm: {
        text: string;
    }
}) => {

    const {main, activeCategory, categories, products, filterProducts, loadMore, curOffset, searchSubmit, setSearchForm, searchForm} = props;
    let loadHidden = '';

    if (products.length < 6) {
        loadHidden = ' hidden';
    }

    const searchHidden = main;

    if (products.length) {
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