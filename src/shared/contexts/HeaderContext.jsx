import { createContext } from "react";

export const HeaderContext =
    createContext({
        cartQty: null,
        searchHeaderState: null,
        searchHeaderForm: null,
        setSearchHeaderForm: null,
        clickSearchHeader: null
    });