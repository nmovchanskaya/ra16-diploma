import { MenuFooter } from "./MenuFooter";

export const Footer = () => {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <section>
                        <h5>Information</h5>
                        <MenuFooter/>
                    </section>
                </div>
                <div className="col">
                    <section>
                        <h5>We accept:</h5>
                        <div className="footer-pay">
                            <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                            <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                            <div className="footer-pay-systems footer-pay-systems-visa"></div>
                            <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                            <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                            <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
                        </div>
                    </section>
                    <section>
                        <div className="footer-copyright">2009-2024 © BosaNoga.ru — moden shoes & accessories.
                        All rights reserved.<br/>Delivery worldwide!
                        </div>
                    </section>
                </div>
                <div className="col text-right">
                    <section className="footer-contacts">
                        <h5>Contacts:</h5>
                        <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+55 777 903 503</a>
                        <span className="footer-contacts-working-hours">Everyday: from 9am till 9pm</span>
                        <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.com</a>
                        <div className="footer-social-links">
                            <div className="footer-social-link footer-social-link-twitter"></div>
                            <div className="footer-social-link footer-social-link-vk"></div>
                        </div>
                    </section>
                </div>
            </div>
        </footer>
    )
}
