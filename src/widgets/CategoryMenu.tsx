import { CategoryLink } from "../entities/category/ui/CategoryLink";
import { Category } from "../entities/category/model/Category";

export const CategoryMenu = (props: {activeCategory: number, categories: Category[], filterProducts: any}) => {

    const {activeCategory, categories, filterProducts} = props;
    let allActive = '';

    if (activeCategory === 0) {
        allActive = ' active';
    }

    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a className={"nav-link" + allActive} href="#" onClick={() => filterProducts(0)}>Все</a>
            </li>
            {categories.map((item: Category) => {
                return (
                    <CategoryLink activeCategory={activeCategory} category={item} filterProducts={filterProducts}/>
                )
            })}
        </ul>
    )
}