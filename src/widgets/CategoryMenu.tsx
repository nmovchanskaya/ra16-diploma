import { CategoryLink } from "../entities/category/ui/CategoryLink";
import { Category } from "../entities/category/model/Category";
import { Link } from "react-router-dom";

export const CategoryMenu = (props: {
    activeCategory: number, 
    categories: Category[], 
    filterProducts: (category: number) => void
}) => {

    const {activeCategory, categories, filterProducts} = props;
    let allActive = '';

    if (activeCategory === 0) {
        allActive = ' active';
    }

    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <Link className={"nav-link" + allActive} to="" onClick={() => filterProducts(0)}>Все</Link>
            </li>
            {categories.map((item: Category) => {
                return (
                    <CategoryLink activeCategory={activeCategory} category={item} filterProducts={filterProducts}/>
                )
            })}
        </ul>
    )
}