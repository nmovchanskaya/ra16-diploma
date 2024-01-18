import { Header } from "../widgets/Header";
import { Footer } from "../widgets/Footer";
import { Banner } from "../widgets/Banner";

export const InformationPage = (props: any) => {    
    return (
        <>
            <Header/>
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
