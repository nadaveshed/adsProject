import React, {useEffect, useState} from "react";
import axios from "axios";
import './cars.css';
import Modal from "react-modal";

function Cars() {
    const API_URL = 'http://localhost:8080/api/cars';
    const headers = {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
    };

    const [advertisements, setAdvertisements] = useState([]);

    const [newCar, setNewCar] = useState({
        manufacturer: '',
        model: '',
        year: '2023',
        hand: '0',
        paint: 'Blue',
        distance: '0',
        price: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [showDataPopup, setDataShowPopup] = useState(false);
    const [editCarId, setEditCarId] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [isFilterOn, setIsFilterOn] = useState(false);
    // const [sizeFilter, setSizeFilter] = useState('');
    // const [selectedCar, setSelectedCar] = useState(null);

    const handleMinPriceFilter = (e) => {
        setMinPriceFilter(e.target.value);
    };
    const handleMaxPriceFilter = (e) => {
        setMaxPriceFilter(e.target.value);
    };

    useEffect(() => {
        fetchCars().then();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            setAdvertisements(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleAdd = () => {
        setShowPopup(true);
        setNewCar({
            manufacturer: '',
            model: '',
            year: '2023',
            hand: '0',
            paint: '',
            distance: '0',
            price: '',
        });
        setEditCarId(null);
    };

    const handleEdit = (car) => {
        setShowPopup(true);
        setNewCar({ ...car });
        setEditCarId(car.id);
    };

    const handleDelete = async (carId) => {
        try {
            await axios.delete(`${API_URL}/${carId}`,{
                headers});
            await fetchCars();
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewCar((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newCar)
        try {
            if (editCarId) {
                await axios.put(`${API_URL}/${editCarId}`, newCar, {headers});
            } else {
                await axios.post(API_URL, newCar, {headers});
            }
            setShowPopup(false);
            await fetchCars();
        } catch (error) {
            console.error('Error submitting car:', error);
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
        setNewCar({
            manufacturer: '',
            model: '',
            year: '2023',
            hand: '0',
            paint: 'Black',
            distance: '0',
            price: '',
        });
        setEditCarId(null);
    };

    const filteredAdvertisements = advertisements
        .sort((a, b) => a.id - b.id)
        .filter((car) => {
            if (!isFilterOn) {
                return true;
            }

            if (!minPriceFilter && !maxPriceFilter) return true;

            const price = parseInt(car.price);

            if (minPriceFilter && !maxPriceFilter) {
                return price >= parseInt(minPriceFilter);
            }
            if (!minPriceFilter && maxPriceFilter) {
                return price <= parseInt(maxPriceFilter);
            }

            return price >= parseInt(minPriceFilter) && price <= parseInt(maxPriceFilter);
        });
    const handleToggleFilter = () => {
        setIsFilterOn(!isFilterOn);
    };

    // const handleSizeFilter = (e) => {
    //     setSizeFilter(e.target.value);
    // };
    //
    // // Show data popup
    // const handleAdClick = (car) => {
    //     // setDataShowPopup(car);
    //     setSelectedCar(car);
    // };
    //
    // // Show data popup
    // const handleClosePopup = () => {
    //     setSelectedCar(null);
    // };

    return (
        <div>
            <h1>Cars Board</h1>
            <div className={"header-div"}>
                <button className="new-ad-btn" onClick={handleAdd}>New Ad</button>
                <div className={"filter-price-div"}>
                    <div className={"filter-price-input"}>
                        <label>
                            <input type="number" className="input-filter" value={minPriceFilter} min={0} max={maxPriceFilter} placeholder="From-" onChange={handleMinPriceFilter} />
                        </label>
                        <label>
                            <input type="number" className="input-filter" value={maxPriceFilter} min={minPriceFilter || 0} max={99999999} placeholder="To-" onChange={handleMaxPriceFilter} />
                        </label>
                    </div>
                    <button className={isFilterOn ? 'filter-button active' : 'filter-button'} onClick={handleToggleFilter}>
                        {isFilterOn ? 'Filter On' : 'Filter Off'}
                    </button>
                </div>
            </div>
            {filteredAdvertisements.length === 0 ? (
                <p>No advertisements found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Hand</th>
                        <th>Paint</th>
                        <th>Distance</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAdvertisements.map((car) => (
                        <tr key={car.id}
                            // onClick={() => handleAdClick(car)}
                        >
                            <td>{car.manufacturer}</td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td>{car.hand}</td>
                            <td>{car.paint}</td>
                            <td>{car.distance}</td>
                            <td>{car.price}</td>
                            <td>
                                <button onClick={() => handleEdit(car)}>Edit</button>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Modal isOpen={showPopup} ariaHideApp={false} title={editCarId ? 'Edit Ad' : 'Add New Ad'} onClose={() => setShowPopup(false)}>
                <form onSubmit={handleSubmit}>
                    <div className={"modal-form"}>
                        <h2>{editCarId ? 'Edit Ad' : 'Add New Ad'}</h2>
                        <label>Manufacturer: </label>
                        <input
                            type="text"
                            name="manufacturer"
                            value={newCar.manufacturer}
                            required
                            onChange={handleFormChange}
                        />
                        <label>Model: </label>
                        <input
                            type="text"
                            name="model"
                            value={newCar.model}
                            required
                            onChange={handleFormChange}
                        />
                        <label>Year: </label>
                        <input
                            type="number"
                            name="year"
                            value={newCar.year}
                            required
                            min={1970}
                            max={2023}
                            onChange={handleFormChange}
                        />
                        <label>Hand: </label>
                        <input
                            type="number"
                            name="hand"
                            value={newCar.hand}
                            required
                            min={0}
                            max={20}
                            onChange={handleFormChange}
                        />
                        <label>Paint: </label>
                        <select name="paint" onChange={handleFormChange}>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Red">Red</option>
                            <option value="Gray">Gray</option>
                            <option value="Pink">Pink</option>
                            <option value="Brown">Brown</option>
                            <option value="Blue">Blue</option>
                            <option value="Orange">Orange</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Purple">Purple</option>
                        </select>
                        <label>Distance: </label>
                        <input
                            type="number"
                            name="distance"
                            value={newCar.distance}
                            min={0}
                            max={1000000}
                            maxLength={6}
                            onChange={handleFormChange}
                        />
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={newCar.price}
                            onChange={handleFormChange}
                        />
                        <button type="submit">Save Ad</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </Modal>

            {/*{selectedCar && (*/}
            {/*    <Modal isOpen={showDataPopup} ariaHideApp={false} title="Product Details" onClose={() => setSelectedCar(null)}>*/}
            {/*        <div>*/}
            {/*            <h3>Manufacturer: {selectedCar.manufacturer}</h3>*/}
            {/*            <h3>Model: {selectedCar.model}</h3>*/}
            {/*            <h3>Year: {selectedCar.year}</h3>*/}
            {/*            <h3>Hand: {selectedCar.hand}</h3>*/}
            {/*            <h3>Paint: {selectedCar.paint}</h3>*/}
            {/*            <h3>Distance: {selectedCar.distance}km</h3>*/}
            {/*            <h3>Price: {selectedCar.price}$</h3>*/}
            {/*            <button type="button" onClick={handleClosePopup}>Close</button>*/}
            {/*        </div>*/}
            {/*    </Modal>*/}
            {/*)}*/}
        </div>
    );
};
export default Cars;
