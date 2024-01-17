import { NavLink } from "react-router-dom";

export const MenuFooter = () => {
    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink to='/about' className={"nav-link"}>About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/catalog' className={"nav-link"}>Catalog</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/contacts' className={"nav-link"}>Contacts</NavLink>
            </li>
        </ul>
    )
  }
