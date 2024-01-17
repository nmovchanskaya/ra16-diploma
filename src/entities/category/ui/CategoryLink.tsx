import { Category } from "../model/Category";

export const CategoryLink = (props: {activeCategory: number, category: Category, filterProducts: any}) => {
    const {activeCategory, category, filterProducts} = props;
    let active = '';

    if (activeCategory === category.id) {
        active = ' active';
    }

    return (
        <li className="nav-item">
            <a className={"nav-link" + active} href="#" onClick={() => filterProducts(category.id)}>{category.title}</a>
        </li>
    )
}
