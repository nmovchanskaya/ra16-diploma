import { HeaderContext } from '../shared/contexts/HeaderContext';
import { useContext } from 'react';

export const Banner = () => {

    const {websiteUrl} = useContext(HeaderContext);

    return (
        <div className="banner">
            <img src={websiteUrl + "/img/banner.jpg"} className="img-fluid" alt="Ready for spring!"/>
            <h2 className="banner-header">Ready for spring!</h2>
        </div>
    )
}