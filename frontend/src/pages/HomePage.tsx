import React from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

import heroImg from '../assets/homehero/tesla-hero-img-1.avif'
import heroImg2 from '../assets/homehero/tesla-hero-img-2.avif'
import heroImg3 from '../assets/homehero/tesla-hero-img-3.avif'

import carCarousel1 from '../assets/carcarousel/car-carousel-1.avif'
import carCarousel2 from '../assets/carcarousel/car-carousel-2.avif'
import carCarousel3 from '../assets/carcarousel/car-carousel-3.avif'
import carCarousel4 from '../assets/carcarousel/car-carousel-4.avif'
import carCarousel5 from '../assets/carcarousel/car-carousel-5.avif'

import itemCarousel1 from '../assets/itemcarousel/item-carousel-1.avif'
import itemCarousel2 from '../assets/itemcarousel/item-carousel-2.avif'
import itemCarousel3 from '../assets/itemcarousel/item-carousel-3.avif'
import itemCarousel4 from '../assets/itemcarousel/item-carousel-4.avif'

import offer1 from '../assets/offers/offer-image-1.avif'
import offer2 from '../assets/offers/offer-image-2.avif'

import featureVideo from '../assets/featuresection/self-driving-feature.mp4'
import featureImg from '../assets/featuresection/feature-img.avif'

import icon1 from '../assets/icons/superchargers.svg'
import icon2 from '../assets/icons/destinationChargers.svg'

import '../styles/home.css'
import Footer from '../components/footer';

const HomePage = () => {

    const settings = {
        fade: true,
        infinite: true,
        dots: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
    };

    const car_carousel_settings = {
        className: "center",
        infinite: false,
        centerPadding: "0px",
        slidesToShow: 1.5,
        swipeToSlide: true,
        dots: true
    }

    return(
        <div className="home-container">
            <div className="navbar-container">
                <Navbar/>
            </div>

            {/*Hero component */}
            <div className='hero-container'>
                <Slider {...settings}>
                    <div className='hero-section'>
                    <div className='hero-img-container'>
                        <img src={heroImg} className='hero-img' alt='hero-img'/>
                    </div>
                    <div className='hero-text'>
                        <div className='hero-name'>Model Y</div>
                        <div className='hero-buttons'>
                            <button className='hero-button var-1'>Order Now</button>
                            <button className='hero-button var-2'>Learn More</button>
                        </div>
                    </div>
                    </div>
                    <div className='hero-section'>
                    <div className='hero-img-container'>
                        <img src={heroImg2} className='hero-img' alt='hero-img'/>
                    </div>
                    <div className='hero-text'>
                        <div className='hero-name'>Model 3</div>
                        <div className='hero-buttons'>
                            <button className='hero-button var-1'>Order Now</button>
                            <button className='hero-button var-2'>Learn More</button>
                        </div>
                    </div>
                    </div>
                    <div className='hero-section'>
                    <div className='hero-img-container'>
                        <img src={heroImg3} className='hero-img' alt='hero-img'/>
                    </div>
                    <div className='hero-text'>
                        <div className='hero-name'>Cybertruck</div>
                        <div className='hero-lease-text'>Lease from $729/mo</div>
                        <div className='hero-buttons'>
                            <button className='hero-button var-1'>Order Now</button>
                            <button className='hero-button var-2'>Learn More</button>
                        </div>
                    </div>
                    </div>
                </Slider>
            </div>

            {/*Car Carousel */}
            <div className='car-carousel-container'>
                <Slider {...car_carousel_settings}>
                    <div className='car-carousel-item'>
                        <div className='car-carousel-img-container'>
                            <img src={carCarousel1} alt="car-img" className='car-carousel-img'/>
                        </div>
                        <div className='car-carousel-text-1'>Sports Sedan</div>
                        <div className='car-carousel-text'>
                            <div className='car-carousel-name'>Model 3</div>
                            <div className='car-carousel-lease-text'>As Low as 1.99% APR Available</div>
                            <div className='car-carousel-buttons'>
                                <button className='car-carousel-button var-1'>Order Now</button>
                                <button className='car-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='car-carousel-item'>
                        <div className='car-carousel-img-container'>
                            <img src={carCarousel2} alt="car-img" className='car-carousel-img'/>
                        </div>
                        <div className='car-carousel-text-1'>Midsize SUV</div>
                        <div className='car-carousel-text'>
                            <div className='car-carousel-name'>Model Y</div>
                            <div className='car-carousel-lease-text'>As Low as 1.99% APR Available</div>
                            <div className='car-carousel-buttons'>
                                <button className='car-carousel-button var-1'>Order Now</button>
                                <button className='car-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='car-carousel-item'>
                        <div className='car-carousel-img-container'>
                            <img src={carCarousel3} alt="car-img" className='car-carousel-img'/>
                        </div>
                        <div className='car-carousel-text-1'>Utility Truck</div>
                        <div className='car-carousel-text'>
                            <div className='car-carousel-name'>Cybertruck</div>
                            <div className='car-carousel-lease-text'>2.49% APR Available</div>
                            <div className='car-carousel-buttons'>
                                <button className='car-carousel-button var-1'>Order Now</button>
                                <button className='car-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='car-carousel-item'>
                        <div className='car-carousel-img-container'>
                            <img src={carCarousel4} alt="car-img" className='car-carousel-img'/>
                        </div>
                        <div className='car-carousel-text-1'>Luxury SUV</div>
                        <div className='car-carousel-text'>
                            <div className='car-carousel-name'>Model X</div>
                            <div className='car-carousel-lease-text'>3.99% APR Available</div>
                            <div className='car-carousel-buttons'>
                                <button className='car-carousel-button var-1'>Order Now</button>
                                <button className='car-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='car-carousel-item'>
                        <div className='car-carousel-img-container'>
                            <img src={carCarousel5} alt="car-img" className='car-carousel-img'/>
                        </div>
                        <div className='car-carousel-text-1'>Luxury Sedan</div>
                        <div className='car-carousel-text'>
                            <div className='car-carousel-name'>Model S</div>
                            <div className='car-carousel-lease-text'>3.99% APR Available</div>
                            <div className='car-carousel-buttons'>
                                <button className='car-carousel-button var-1'>Order Now</button>
                                <button className='car-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
            {/*Offers */}
            <div className='offers'>
                <div className='offer-container'>
                    <div className="offer-text">
                        <div className="offer-heading">Current Offers</div>
                        <div className="offer-subheading">Explore limited-time offers on Tesla vehicles</div>
                        <div className="offer-button-container">
                            <button className="offer-button var-2">Learn More</button>
                        </div>
                    </div>
                    <div className="offer-img-container">
                        <img src={offer1} alt="offer-img" className="offer-img" />
                    </div>
                </div>
                <div className='offer-container'>
                    <div className="offer-text">
                        <div className="offer-heading">American Heroes</div>
                        <div className="offer-subheading">$500 off for military, first responders, healthcare, teachers and students</div>
                        <div className="offer-button-container">
                            <button className="offer-button var-2">Learn More</button>
                        </div>
                    </div>
                    <div className="offer-img-container">
                        <img src={offer2} alt="offer-img" className="offer-img" />
                    </div>
                </div>
            </div>
            
            {/*Feature Section */}
            <div className="feature-section">
                <div className="self-driving-feature">
                    <div className="video-container">
                        <video autoPlay loop muted playsInline className="feature-video">
                            <source src={featureVideo} type='video/mp4' />
                            Your browser does not support the video tag
                        </video>
                    </div>
                    <div className="feature-video-text">
                        <div className="feature-heading">Full Self-Driving(Supervised)</div>
                        <div className="feature-buttons">
                            <button className="feature-button var-1">Demo Drive</button>
                            <button className="feature-button var-2">View Report</button>
                        </div>
                    </div>
                </div>
                <div className="standard-feature">
                    <div className="feature-img-container">
                        <img src={featureImg} className='feature-img' alt='feature-img'/>
                    </div>
                    <div className="feature-text">
                        <div className="feature-heading">Features That Come Standard</div>
                        <div className="feature-buttons">
                            <button className="feature-button var-1">Discover</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Map item */}
            <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46079811.4807769!2d-106.56193477891998!3d45.17720690645059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1763822872660!5m2!1sen!2sin" width="600" height="450" style={{border:0, width: '90%', height: '80vh', borderRadius: '10px'}} loading="lazy"></iframe>
            </div>

            {/*View charging network*/}
            <div className="network-section">
                <div className="network-text">
                    <div className="network-text-container">
                        <div className="network-desc">
                            <div className="network-title">Find Your Charge</div>
                            <div className="network-desc">View the network of Tesla Superchargers and Destination Chargers available near you.</div>
                        </div>
                        <div className="network-numbers">
                            <div className="network-number">
                                <div className="network-group">
                                    <div className="number">34,615</div>
                                    <img src={icon1} alt="supercharger" className="number-icon" />
                                </div>
                                <div className="number-subtitle">Superchargers</div>
                            </div>
                            <div className="network-number">
                                <div className="network-group">
                                    <div className="number">10,154</div>
                                    <img src={icon2} alt="Destination charger" className="number-icon" />
                                </div>
                                <div className="number-subtitle">Destination Chargers</div>                    
                            </div>
                        </div>
                    </div>
                    
                    <div className="network-button-container">
                        <button className="network-button var-3">View Network</button>
                        <button className="network-button var-2">Learn More</button>
                    </div>
                </div>
            </div>

            {/*Item Carousel */}
            <div className='item-carousel-container'>
                <Slider {...car_carousel_settings}>
                    <div className='item-carousel-item'>
                        <div className='item-carousel-img-container'>
                            <img src={itemCarousel1} alt="car-img" className='item-carousel-img'/>
                        </div>
                        <div className='item-carousel-text'>
                            <div className='item-carousel-name'>Solar Panels</div>
                            <div className='item-carousel-lease-text'>Power Your Home and Reduce Your Electricity Bill</div>
                            <div className='item-carousel-buttons'>
                                <button className='item-carousel-button var-1'>Order Now</button>
                                <button className='item-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-carousel-item'>
                        <div className='item-carousel-img-container'>
                            <img src={itemCarousel2} alt="car-img" className='item-carousel-img'/>
                        </div>
                        <div className='item-carousel-text'>
                            <div className='item-carousel-name'>Powerwall</div>
                            <div className='item-carousel-lease-text'>Keep Your Lights On During Outages</div>
                            <div className='item-carousel-buttons'>
                                <button className='item-carousel-button var-1'>Order Now</button>
                                <button className='item-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-carousel-item'>
                        <div className='item-carousel-img-container'>
                            <img src={itemCarousel3} alt="car-img" className='item-carousel-img'/>
                        </div>
                        <div className='item-carousel-text'>
                            <div className='item-carousel-name'>Megapack</div>
                            <div className='item-carousel-lease-text'>Massive Batteries for Massive Energy Support</div>
                            <div className='item-carousel-buttons'>
                                <button className='item-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className='item-carousel-item'>
                        <div className='item-carousel-img-container'>
                            <img src={itemCarousel4} alt="car-img" className='item-carousel-img'/>
                        </div>
                        <div className='item-carousel-text'>
                            <div className='item-carousel-name'>Solar Roof</div>
                            <div className='item-carousel-lease-text'>Generate Clean Energy With Your Roof</div>
                            <div className='item-carousel-buttons'>
                                <button className='item-carousel-button var-1'>Order Now</button>
                                <button className='item-carousel-button var-2'>Learn More</button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            <footer className='footer-container'>
                <Footer/>
            </footer>
        </div>        
    )
};

export default HomePage