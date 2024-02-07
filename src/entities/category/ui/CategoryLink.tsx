import { Category } from "../model/Category";
import { Link } from "react-router-dom";

export const CategoryLink = (props: {
    activeCategory: number, 
    category: Category, 
    filterProducts: (category: number) => void
}) => {
    const {activeCategory, category, filterProducts} = props;
    let active = '';

    if (activeCategory === category.id) {
        active = ' active';
    }

    return (
        <li className="nav-item">
            <Link className={"nav-link" + active} to="#" onClick={() => filterProducts(category.id)}>{category.title}</Link>
        </li>
    )
}
