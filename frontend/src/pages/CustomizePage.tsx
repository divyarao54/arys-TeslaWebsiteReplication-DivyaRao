import '../styles/customize.css';
import React, { useState, useMemo } from 'react';
import Navbar from '../components/navbar';

// --- IMAGE IMPORTS ---
// (Imports remain unchanged)
import logo from "../assets/images/logo.svg";
import exteriorImageDefault from "../assets/images/model-y-stealth-grey.jpg";
import interiorImageDark from "../assets/images/model-y-interior-dark.jpg";
import interiorImageLight from "../assets/images/model-y-interior-light.jpg"; 

import modelYStealthGrey from "../assets/images/model-y-stealth-grey.jpg";
import modelYPearlWhite from "../assets/images/model-y-pearl-white.jpg";
import modelYDeepBlue from "../assets/images/model-y-deep-blue-metallic.jpg";
import modelYSolidBlack from "../assets/images/model-y-solid-black.jpg";
import modelYUltraRed from "../assets/images/model-y-ultra-red.jpg";
import modelYQuicksilver from "../assets/images/model-y-quicksilver.jpg";

import buttonStealthGrey from "../assets/images/button-stealth-grey.avif";
import buttonPearlWhite from "../assets/images/button-pearl-white.avif";
import buttonDeepBlue from "../assets/images/button-deep-blue-metallic.avif";
import buttonSolidBlack from "../assets/images/button-solid-black.avif";
import buttonUltraRed from "../assets/images/button-ultra-red.avif";
import buttonQuicksilver from "../assets/images/button-quicksilver.avif";
import buttonDark from "../assets/images/button-dark.avif";
import buttonLight from "../assets/images/button-light.avif";

// Mapping the imported variables to a single object for easy configuration access
const DYNAMIC_IMAGE_PATHS = {
    logo: logo,
    exteriorImageDefault: exteriorImageDefault,
    interiorImageDark: interiorImageDark,
    
    // Exterior Colors
    modelYStealthGrey: modelYStealthGrey,
    modelYPearlWhite: modelYPearlWhite,
    modelYDeepBlue: modelYDeepBlue,
    modelYSolidBlack: modelYSolidBlack,
    modelYUltraRed: modelYUltraRed,
    modelYQuicksilver: modelYQuicksilver,

    // Buttons
    buttonStealthGrey: buttonStealthGrey,
    buttonPearlWhite: buttonPearlWhite,
    buttonDeepBlue: buttonDeepBlue,
    buttonSolidBlack: buttonSolidBlack,
    buttonUltraRed: buttonUltraRed,
    buttonQuicksilver: buttonQuicksilver,
    buttonDark: buttonDark,
    buttonLight: buttonLight,
};

// --- TypeScript Interfaces ---
interface CarOption {
    name: string;
    price: number;
    hex: string;
    buttonImage: string;
    mainImage: string;
}

interface WheelOption {
    name: string;
    price: number;
    key: 'standard' | 'performance';
}

interface Accessory {
    name: string;
    price: number;
    key: 'trays' | 'sunshade' | 'liners';
}

interface AccessoriesState {
    trays: boolean;
    sunshade: boolean;
    liners: boolean;
}

// --- Configuration Data ---
const BASE_PRICE: number = 47490;
const FSD_PRICE: number = 8500;
const PERFORMANCE_PRICE: number = 5000;
const DOWN_PAYMENT: number = 5000;
const LOAN_TERM_MONTHS: number = 60;
const ANNUAL_RATE: number = 0.03;

const COLORS: CarOption[] = [
    { name: 'Stealth Grey', price: 0, hex: '#4b5563', buttonImage: DYNAMIC_IMAGE_PATHS.buttonStealthGrey, mainImage: DYNAMIC_IMAGE_PATHS.modelYStealthGrey },
    { name: 'Pearl White', price: 1000, hex: '#f9fafb', buttonImage: DYNAMIC_IMAGE_PATHS.buttonPearlWhite, mainImage: DYNAMIC_IMAGE_PATHS.modelYPearlWhite },
    { name: 'Deep Blue', price: 1000, hex: '#1e3a8a', buttonImage: DYNAMIC_IMAGE_PATHS.buttonDeepBlue, mainImage: DYNAMIC_IMAGE_PATHS.modelYDeepBlue },
    { name: 'Solid Black', price: 1500, hex: '#111827', buttonImage: DYNAMIC_IMAGE_PATHS.buttonSolidBlack, mainImage: DYNAMIC_IMAGE_PATHS.modelYSolidBlack },
    { name: 'Ultra Red', price: 2000, hex: '#dc2626', buttonImage: DYNAMIC_IMAGE_PATHS.buttonUltraRed, mainImage: DYNAMIC_IMAGE_PATHS.modelYUltraRed },
    { name: 'Quicksilver', price: 1500, hex: '#9ca3af', buttonImage: DYNAMIC_IMAGE_PATHS.buttonQuicksilver, mainImage: DYNAMIC_IMAGE_PATHS.modelYQuicksilver },
];

const INTERIORS: CarOption[] = [
    { name: 'Dark (Black)', price: 0, hex: '#1f2937', buttonImage: DYNAMIC_IMAGE_PATHS.buttonDark, mainImage: DYNAMIC_IMAGE_PATHS.interiorImageDark },
    { name: 'Light (White)', price: 1000, hex: '#f3f4f6', buttonImage: DYNAMIC_IMAGE_PATHS.buttonLight, mainImage: interiorImageLight },
];

const WHEELS: WheelOption[] = [
    { name: 'Standard Wheels', price: 0, key: 'standard' },
    { name: 'Performance Wheels', price: 2500, key: 'performance' },
];

const ACCESSORIES: Accessory[] = [
    { name: 'Center Console Trays', price: 35, key: 'trays' },
    { name: 'Sunshade', price: 105, key: 'sunshade' },
    { name: 'All-Weather Interior Liners', price: 225, key: 'liners' },
];

// Utility for formatting currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// --- Main App Component ---
const CustomizePage = () => {
    // State Initialization (unchanged)
    const [exteriorColor, setExteriorColor] = useState<CarOption>(COLORS[0]);
    const [interiorColor, setInteriorColor] = useState<CarOption>(INTERIORS[0]);
    const [wheels, setWheels] = useState<WheelOption>(WHEELS[0]);
    const [fsd, setFsd] = useState<boolean>(false);
    const [performancePackage, setPerformancePackage] = useState<boolean>(false);
    const [accessories, setAccessories] = useState<AccessoriesState>({
        trays: false,
        sunshade: false,
        liners: false,
    });
    
    // Custom Modal State (unchanged)
    const [showModal, setShowModal] = useState<boolean>(false);

    // --- NEW STATE FOR IMAGE TRANSITION ---
    // 1. Controls the opacity (true = fading out/in, opacity 0)
    const [isFading, setIsFading] = useState<boolean>(false);
    // 2. Tracks the view type
    const [currentViewKey, setCurrentViewKey] = useState<'exterior' | 'interior'>('exterior');

    // Constants for the transition timing
    const TRANSITION_DURATION_MS = 300; // Matches the CSS duration
    
    // Function to calculate the correct source image based on current customization states
    const getDisplayedSource = (viewKey: 'exterior' | 'interior', exterior: CarOption, interior: CarOption): string => {
        return viewKey === 'exterior' ? exterior.mainImage : interior.mainImage;
    };
    
    // State to hold the image source that is currently loaded in the <img> tag
    // This allows the fade-out to occur on the OLD image before switching the src.
    const [displayedImageSrc, setDisplayedImageSrc] = useState<string>(getDisplayedSource('exterior', COLORS[0], INTERIORS[0]));

    // --- NEW HANDLER FOR IMAGE TRANSITION ---
    const handleViewChange = (
        isExterior: boolean, 
        newExterior?: CarOption, 
        newInterior?: CarOption
    ) => {
        // Only trigger transition if the view or customization option is actually changing
        const newKey: 'exterior' | 'interior' = isExterior ? 'exterior' : 'interior';
        
        // Check if the customization data itself is changing
        const customizationChanging = newExterior || newInterior;
        
        // If the view type or any option is changing:
        if (newKey !== currentViewKey || customizationChanging) {
            
            // 1. Start the fade-out
            setIsFading(true); 
            
            // 2. Apply the customization changes immediately to state, but the image won't change yet.
            if (newExterior) setExteriorColor(newExterior);
            if (newInterior) setInteriorColor(newInterior);
            
            // 3. Wait for the fade-out duration
            setTimeout(() => {
                // 4. Update the image source and view key in the background (opacity is 0)
                const targetExterior = newExterior || exteriorColor;
                const targetInterior = newInterior || interiorColor;
                
                setDisplayedImageSrc(getDisplayedSource(newKey, targetExterior, targetInterior));
                setCurrentViewKey(newKey);
                
                // 5. Start the fade-in (remove the fading class)
                setIsFading(false);
            }, TRANSITION_DURATION_MS); 
        }
    };
    // ----------------------------------------

    // Dynamic Price Calculation (unchanged)
    const totalPrice = useMemo((): number => {
        let price: number = BASE_PRICE;
        price += exteriorColor.price;
        price += interiorColor.price;
        price += wheels.price;
        if (fsd) price += FSD_PRICE;
        if (performancePackage) price += PERFORMANCE_PRICE;
        price += ACCESSORIES.reduce((sum: number, acc: Accessory): number => {
            return sum + (accessories[acc.key as keyof AccessoriesState] ? acc.price : 0);
        }, 0);
        return price;
    }, [exteriorColor, interiorColor, wheels, fsd, performancePackage, accessories]);

    // Estimated Monthly Payment Calculation (unchanged)
    const calculateMonthlyPayment = (total: number): string => {
        const loanAmount: number = total - DOWN_PAYMENT;
        if (loanAmount <= 0) return '0.00';
        const r: number = ANNUAL_RATE / 12;
        const n: number = LOAN_TERM_MONTHS;
        const numerator: number = loanAmount * r * Math.pow(1 + r, n);
        const denominator: number = Math.pow(1 + r, n) - 1;
        const monthlyPayment: number = numerator / denominator;
        return monthlyPayment.toFixed(2);
    };

    const monthlyPayment: string = calculateMonthlyPayment(totalPrice);

    // Handlers (unchanged)
    const handleAccessoryChange = (key: keyof AccessoriesState) => {
        setAccessories(prev => ({ ...prev, [key]: !prev[key] }));
    };
    
    // Determine wheel button classes (unchanged)
    const getWheelButtonClass = (isSelected: boolean): string => {
        const baseClass = 'wheel-button-option';
        if (isSelected) {
            return `${baseClass} wheel-selected`;
        } else {
            return `${baseClass} wheel-default`;
        }
    }


    return (
        <>
            {/* Confirmation Modal (unchanged) */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Order Confirmed!</h2>
                        <p>
                            Your custom Model Y is configured for: 
                            <span className="modal-price">{formatCurrency(totalPrice)}</span>
                        </p>
                        <p className="modal-payment-line">
                            Estimated Monthly Payment: 
                            <span className="modal-price">${monthlyPayment}</span>
                        </p>
                        <button className="modal-button" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Navbar component (unchanged) */}
            <div className='customize-header'>
                <Navbar/>
            </div>

            <main className="main-layout">
                {/* Image Section: Now uses the new state and logic */}
                <section className="image-section-container">
                    <div className="image-sticky-wrapper">
                        
                        <div className="image-display-box single-view">
                            <img
                                src={displayedImageSrc} // Use the src that changes after fade-out
                                alt={`Model Y: ${currentViewKey === 'exterior' ? exteriorColor.name : interiorColor.name}`}
                                // Apply 'fading' class to control opacity
                                className={`car-image-preview ${isFading ? 'fading' : ''} ${currentViewKey}-view`}
                                id="main-car-image"
                            />
                        </div>

                        
                    </div>
                </section>

                {/* Sidebar */}
                <aside className="sidebar-container">
                    <h1 className="model-title">Model Y</h1>
                    <h2 className="customize-subtitle">Customize Your Car</h2>

                    {/* 1. Exterior Color */}
                    <div className="customization-group" id="exterior-buttons">
                        <h3 className="group-title">Exterior Color</h3>
                        <div className="color-option-list">
                            {COLORS.map((color: CarOption) => (
                                <button
                                    key={color.name}
                                    className={`${exteriorColor.name === color.name ? 'btn-selected' : ''} color-button-swatch hover-scale`}
                                    onClick={() => {
                                        // Pass the new color to the handler
                                        handleViewChange(true, color); 
                                    }}
                                >
                                    <img
                                        src={color.buttonImage}
                                        alt={color.name}
                                        className="color-button-img-exterior"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Interior Color */}
                    <div className="customization-group" id="interior-buttons">
                        <h3 className="group-title">Interior Color</h3>
                        <div className="color-option-list">
                            {INTERIORS.map((interior: CarOption) => (
                                <button
                                    key={interior.name}
                                    className={`${interiorColor.name === interior.name ? 'btn-selected' : ''} color-button-swatch hover-scale`}
                                    onClick={() => {
                                        // Pass the new interior to the handler
                                        handleViewChange(false, undefined, interior); 
                                    }}
                                >
                                    <img 
                                        src={interior.buttonImage} 
                                        alt={interior.name} 
                                        className="color-button-img-interior" 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 3. Wheel Buttons (unchanged state logic, can remain simple) */}
                    <div className="customization-group" id="wheel-buttons">
                        <h3 className="group-title">Wheels</h3>
                        {WHEELS.map((wheel: WheelOption) => (
                            <button
                                key={wheel.name}
                                className={getWheelButtonClass(wheels.name === wheel.name)}
                                onClick={() => setWheels(wheel)}
                            >
                                {wheel.name}
                                {wheel.price > 0 && ` (+$${wheel.price.toLocaleString()})`}
                            </button>
                        ))}
                    </div>

                    {/* 4. Full Self Driving Option (unchanged) */}
                    <div className="option-card-wrapper">
                        <h3 className="group-title">Full Self-Driving</h3>
                        <label className="checkbox-label-container">
                            <input
                                type="checkbox"
                                id="full-self-driving-checkbox"
                                className="form-checkbox-input"
                                checked={fsd}
                                onChange={() => setFsd(!fsd)}
                            />
                            <span>Add Full Self-Driving for {formatCurrency(FSD_PRICE)}</span>
                        </label>
                    </div>

                    {/* 5. Performance Upgrade (unchanged) */}
                    <div className="customization-group">
                        <h3 className="group-title">Performance Package</h3>
                        <button
                            id="performance-btn"
                            className={getWheelButtonClass(performancePackage)}
                            onClick={() => setPerformancePackage(!performancePackage)}
                        >
                            Performance Upgrade
                            {performancePackage ? ' (Included)' : ` (+${formatCurrency(PERFORMANCE_PRICE)})`}
                        </button>
                    </div>

                    {/* 6. Accessories Checkboxes (fixed container issue) */}
                    <div className="customization-group">
                        <h3 className="group-title">Accessories</h3>
                        <div className="accessory-list-container">
                            {ACCESSORIES.map((accessory: Accessory) => (
                                <div className='accessory-item-label-container' key={accessory.key}>
                                    <label
                                        className="accessory-item-label"
                                        onClick={() => handleAccessoryChange(accessory.key as keyof AccessoriesState)}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={accessories[accessory.key as keyof AccessoriesState]}
                                            readOnly
                                            className="accessory-form-checkbox-input"
                                        />
                                        <span>{accessory.name}</span>
                                        <span className="accessory-price-section">
                                            <span>{formatCurrency(accessory.price)}</span>
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Price Section (unchanged) */}
                    <div className="total-price-section">
                        <h3 className="section-title">Total Price</h3>
                        <p id="total-price" className="final-price">{formatCurrency(totalPrice)}</p>
                    </div>

                    {/* Payment Breakdown (unchanged) */}
                    <div className="payment-breakdown-section">
                        <h3 className="section-title">Estimated Payment Breakdown</h3>
                        <div className="payment-details-list">
                            <p>
                                Down Payment:
                                <span id="down-payment" className="payment-value">{formatCurrency(DOWN_PAYMENT)}</span>
                            </p>
                            <p>Loan Term: <span className="payment-value">{LOAN_TERM_MONTHS} Months</span></p>
                            <p>Interest Rate: <span className="payment-value">{ANNUAL_RATE * 100}% APR</span></p>
                            <p>
                                Estimated Monthly Payment:
                                <span id="monthly-payment" className="monthly-payment-value">${monthlyPayment}</span>
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        className="continue-button-main"
                        onClick={() => setShowModal(true)}
                    >
                        Continue to Payment
                    </button>
                </aside>
            </main>
        </>
    );
};

export default CustomizePage;