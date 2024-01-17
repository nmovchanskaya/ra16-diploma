export const Search = (props: {
    searchHidden: boolean, 
    searchSubmit: any,
    setSearchForm: React.Dispatch<React.SetStateAction<{
        text: string;
    }>>, 
    searchForm: {
        text: string;
    },
}) => {

    const {searchHidden, searchSubmit, setSearchForm, searchForm} = props;

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = event.target;
        setSearchForm({...searchForm, [name]: event.target.value});
    }

    if (!searchHidden) {
        return (
            <form className="catalog-search-form form-inline" onSubmit={searchSubmit}>
                <input 
                    className="form-control" 
                    placeholder="Поиск" 
                    name="text"
                    value={searchForm.text}
                    onChange={handlerInputChange}
                />
            </form>
        )
    }
    else {
        return (
            <></>
        )
    }
}