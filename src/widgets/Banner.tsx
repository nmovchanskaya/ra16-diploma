import { HeaderContext } from '../shared/contexts/HeaderContext';
import { useContext } from 'react';

export const Banner = () => {

    const {websiteUrl} = useContext(HeaderContext);

    return (
        <div className="banner">
            <img src={websiteUrl + "/img/banner.jpg"} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}