import {useState} from "react";
import './App.css';
import Apartments from "./components/apartments";
import Cars from "./components/cars";
import Electronics from "./components/electronics";

function App() {
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index) => setActiveIndex(index);
    const checkActive = (index, className) => activeIndex === index ? className : "";
    return (
        <>
            <h2>Advertisement List</h2>
            <div className="tabs">
                <button
                    className={`tab ${checkActive(1, "active")}`}
                    onClick={() => handleClick(1)}
                >
                    Apartments
                </button>
                <button
                    className={`tab ${checkActive(2, "active")}`}
                    onClick={() => handleClick(2)}
                >
                    Cars
                </button>
                <button
                    className={`tab ${checkActive(3, "active")}`}
                    onClick={() => handleClick(3)}
                >
                    Electronics
                </button>
            </div>
            <div className="panels">
                <div className={`panel ${checkActive(1, "active")}`}>
                    <Apartments/>
                </div>
                <div className={`panel ${checkActive(2, "active")}`}>
                    <Cars/>
                </div>
                <div className={`panel ${checkActive(3, "active")}`}>
                    <Electronics/>
                </div>
            </div>
        </>
    );
}

export default App;
