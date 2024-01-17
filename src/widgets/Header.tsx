import { Menu } from './Menu';
import { SearchHeader } from './SearchHeader';

export const Header = (props: {
    cartQty: any,
    searchHeaderState: number,
    searchHeaderForm: any,
    setSearchHeaderForm: any,
    clickSearchHeader: any
}) => {
    const {cartQty, searchHeaderState, searchHeaderForm, setSearchHeaderForm, clickSearchHeader} = props;

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src='img/header-logo.png' alt="Bosa Noga"/>
                        </a>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <Menu/>
                            <div>
                                <div className="header-controls-pics">
                                    <SearchHeader searchHeaderState={searchHeaderState} setSearchHeaderForm={setSearchHeaderForm} searchHeaderForm={searchHeaderForm} clickSearchHeader={clickSearchHeader}/>
                                    <a href="/cart">
                                        <div className="header-controls-pic header-controls-cart">
                                            <div className="header-controls-cart-full">{cartQty}</div>
                                            <div className="header-controls-cart-menu"></div>
                                        </div>
                                    </a>
                                </div>
                                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                    <input className="form-control" placeholder="Поиск"/>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}