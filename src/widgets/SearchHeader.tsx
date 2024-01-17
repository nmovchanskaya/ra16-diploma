export const SearchHeader = (props: {
    searchHeaderState: number,
    setSearchHeaderForm: React.Dispatch<React.SetStateAction<{
        text: string;
    }>>, 
    searchHeaderForm: {
        text: string;
    },
    clickSearchHeader: any
}) => {

    const {searchHeaderState, setSearchHeaderForm, searchHeaderForm, clickSearchHeader} = props;

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = event.target;
        setSearchHeaderForm({...searchHeaderForm, [name]: event.target.value});
    }

    if (searchHeaderState) {
        return (
            <>
                <form className="header-search-form form-inline">
                    <input 
                        className='header-search'
                        name="text"
                        value={searchHeaderForm.text}
                        onChange={handlerInputChange}
                    />
                </form>
                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={clickSearchHeader}>
                </div>
            </>
        )
    }
    else {
        return (
            <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={clickSearchHeader}>
            </div>
        )
    }
}