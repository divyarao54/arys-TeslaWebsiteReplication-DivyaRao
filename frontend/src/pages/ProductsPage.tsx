import Navbar from '../components/navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import "../styles/products.css"

import productHero1 from '../assets/producthero/hero-1.avif'
import productHero2 from '../assets/producthero/hero-2.avif'

import bestSeller1 from '../assets/bestsellers/best-seller-1.avif'
import bestSeller2 from '../assets/bestsellers/best-seller-2.avif'
import bestSeller3 from '../assets/bestsellers/best-seller-3.avif'
import bestSeller4 from '../assets/bestsellers/best-seller-4.avif'
import bestSeller5 from '../assets/bestsellers/best-seller-5.avif'
import bestSeller6 from '../assets/bestsellers/best-seller-6.avif'

import product1 from '../assets/productlist/product-1.avif'
import product2 from '../assets/productlist/product-2.avif'
import product3 from '../assets/productlist/product-3.avif'
import product4 from '../assets/productlist/product-4.avif'
import product5 from '../assets/productlist/product-5.avif'
import product6 from '../assets/productlist/product-6.avif'
import Footer from '../components/footer';

interface ProductData {
    productImg: string;
    productHeading: string;
}

const PRODUCT_LIST_DATA: ProductData[] = [
    { productImg: product1, productHeading: "Model Y Accessories" },
    { productImg: product2, productHeading: "Model 3 Accessories" },
    { productImg: product3, productHeading: "Model S Accessories" },
    { productImg: product4, productHeading: "Model X Accessories" },
    { productImg: product5, productHeading: "Cybertruck Accessories" },
    { productImg: product6, productHeading: "Charging" },
];

const ProductListItem = ({ productImg, productHeading }: ProductData) => (
    <div className="product-item">
        <div className="product-item-img-container">
            <img 
                className="product-item-img" 
                src={productImg} 
                alt={productHeading} 
            />
        </div>
        <div className="product-item-text">
            <div className="product-item-heading">{productHeading}</div>
            <div className="product-item-button-container">
                <button className="product-item-button">Shop Now</button>
            </div>
        </div>
    </div>
);

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "black", borderRadius: "100%", marginTop: "0vh" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, background: "black", borderRadius: "100%", marginTop: "0vh" }}
      onClick={onClick}
    />
  );
}

const ProductsPage = () => {
    const product_hero_settings = {
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
    }

    const best_sellers_settings = {
        infinite: true,
        slidesToShow: 3,
        cssEase: "linear",
        className: "center",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    return (
        <div className='product-page-container'>
            <div className="navbar-container">
                <Navbar/>
            </div>

            {/*Product Hero Component*/}
            <div className="product-hero">
                <Slider {...product_hero_settings}>
                    <div className="product-hero-section">
                        <div className="product-hero-img-container">
                            <img src={productHero1} alt="Model Y Roof Rack" className="product-hero-img" />
                        </div>
                        <div className="product-hero-text">
                            <div className="product-hero-heading">Model Y Roof Rack</div>
                            <div className="product-hero-button-container">
                                <button className="product-hero-button var-2">Learn More</button>
                            </div>
                        </div>
                    </div>
                    <div className="product-hero-section">
                        <div className="product-hero-img-container">
                            <img src={productHero2} alt="Model Y Air Mattress" className="product-hero-img" />
                        </div>
                        <div className="product-hero-text">
                            <div className="product-hero-heading">Model Y Air Mattress</div>
                            <div className="product-hero-button-container">
                                <button className="product-hero-button var-2">Learn More</button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/*Best Sellers Section */}
            <div className="best-sellers-container">
                <Slider {...best_sellers_settings}>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller1} alt="Wall Connector" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Wall Connector</div>
                    </div>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller2} alt="Cyberquad for kids" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Cyberquad for kids</div>
                    </div>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller3} alt="Cybertruck Terrestrial Armor Package" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Cybertruck Terrestrial Armor Package</div>
                    </div>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller4} alt="Model Y All-Weather Interior Liners" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Model Y All-Weather Interior Liners</div>
                    </div>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller5} alt="Model S Roof Rack - Glass Roof" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Model S Roof Rack - Glass Roof</div>
                    </div>
                    <div className="best-sellers-item">
                        <div className="best-sellers-img-container">
                            <img src={bestSeller6} alt="Model 3 Illuminated Door Sills" className="best-sellers-img" />
                        </div>
                        <div className="best-sellers-title">Model 3 Illuminated Door Sills</div>
                    </div>
                </Slider>
            </div>

            {/*Product List*/}
            <div className="product-list-grid">
                {PRODUCT_LIST_DATA.map((product, index) => (
                    <ProductListItem 
                        key={index} 
                        productImg={product.productImg} 
                        productHeading={product.productHeading} 
                    />
                ))}
            </div>

            {/*Footer*/}
            <div className="footer-container">
                <Footer/>
            </div>
        </div>
    )
}

export default ProductsPage