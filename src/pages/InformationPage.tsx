import { Header } from "../widgets/Header";
import { Footer } from "../widgets/Footer";
import { Banner } from "../widgets/Banner";

export const InformationPage = (props: any) => {
    const {cartQty, searchHeaderState, searchHeaderForm, setSearchHeaderForm, clickSearchHeader} = props;
    
    return (
        <>
            <Header 
                cartQty={cartQty} 
                searchHeaderState={searchHeaderState}
                searchHeaderForm={searchHeaderForm}
                setSearchHeaderForm={setSearchHeaderForm}
                clickSearchHeader={clickSearchHeader}
            />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner/>
                        {props.children}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}
