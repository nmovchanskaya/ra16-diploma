import { NavLink } from "react-router-dom";

export const Menu = () => {
    return (
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink to='/ra16-diploma' className={"nav-link"}>Main</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/catalog' className={"nav-link"}>Catalog</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/about' className={"nav-link"}>About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/contacts' className={"nav-link"}>Contacts</NavLink>
            </li>
        </ul>
    )
}
