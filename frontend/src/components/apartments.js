import React, {useEffect, useState} from "react";
import axios from "axios";
import './apartments.css';
import Modal from "react-modal";

function Apartments() {
    const API_URL = 'http://localhost:8080/api/apartments';
    const headers = {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
    };

    const [advertisements, setAdvertisements] = useState([]);

    const [newApartment, setNewApartment] = useState({
        type: '',
        rentOrSell: '',
        size: '',
        rooms: '',
        price: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [editApartmentId, setEditApartmentId] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [isFilterOn, setIsFilterOn] = useState(false);
    const [selectedApartment, setSelectedApartment] = useState(null);

    const handleMinPriceFilter = (e) => {
        setMinPriceFilter(e.target.value);
    };
    const handleMaxPriceFilter = (e) => {
        setMaxPriceFilter(e.target.value);
    };

    useEffect(() => {
        fetchApartments().then();
    }, []);

    const fetchApartments = async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            setAdvertisements(response.data);
        } catch (error) {
            console.error('Error fetching apartments:', error);
        }
    };

    const handleAdd = () => {
        setShowPopup(true);
        setNewApartment({
            type: '',
            rentOrSell: '',
            size: '',
            rooms: '',
            price: '',
        });
        setEditApartmentId(null);
    };

    const handleEdit = (apartment) => {
        setShowPopup(true);
        setNewApartment({ ...apartment });
        setEditApartmentId(apartment.id);
    };

    const handleDelete = async (apartmentId) => {
        try {
            await axios.delete(`${API_URL}/${apartmentId}`,{
                headers: {
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
                }});
            await fetchApartments();
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewApartment((prevApartment) => ({
            ...prevApartment,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editApartmentId) {
                await axios.put(`${API_URL}/${editApartmentId}`, newApartment, {headers});
            } else {
                await axios.post(API_URL, newApartment, {headers});
            }
            console.log(newApartment);
            setShowPopup(false);
            await fetchApartments();
        } catch (error) {
            console.error('Error submitting apartment:', error);
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
        setNewApartment({
            type: '',
            rentOrSell: '',
            size: '',
            rooms: '',
            price: '',
        });
        setEditApartmentId(null);
    };

    const filteredAdvertisements = advertisements
        .sort((a, b) => a.id - b.id)
        .filter((apartment) => {
        if (!isFilterOn) {
            return true;
        }

        if (!minPriceFilter && !maxPriceFilter) return true;

        const price = parseInt(apartment.price);

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

    // Show data popup
    const handleAdClick = (apartment) => {
        setSelectedApartment(apartment);
    };

    // Show data popup
    const handleClosePopup = () => {
        setSelectedApartment(null);
    };

    return (
        <div>
            <h1>Apartment Board</h1>
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
                        <th>Type</th>
                        <th>Rent or Sell</th>
                        <th>Size</th>
                        <th>Rooms</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAdvertisements.map((apartment) => (
                        <tr key={apartment.id} onClick={() => handleAdClick(apartment)}>
                            <td>{apartment.type}</td>
                            <td>{apartment.rentOrSell}</td>
                            <td>{apartment.size}</td>
                            <td>{apartment.rooms}</td>
                            <td>{apartment.price}</td>
                            <td>
                                <button onClick={() => handleEdit(apartment)}>Edit</button>
                                <button onClick={() => handleDelete(apartment.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Modal
                isOpen={showPopup}
                ariaHideApp={false}
                title={editApartmentId ? 'Edit Ad' : 'Add New Ad'}
                onClose={() => setShowPopup(false)}>
                <form onSubmit={handleSubmit}>
                    <div className={"modal-form"}>
                        <h2>{editApartmentId ? 'Edit Ad' : 'Add New Ad'}</h2>
                        <label>Type: </label>
                        <input
                            type="text"
                            name="type"
                            value={newApartment.type}
                            required
                            onChange={handleFormChange}
                        />
                        <label>Choose for rent or for sell:</label>
                        <div>
                            <label htmlFor="Rent">Rent</label>
                            <input
                                type="radio"
                                name="rentOrSell"
                                value="Rent"
                                checked={newApartment.rentOrSell === 'Rent'}
                                onChange={handleFormChange}
                            />
                            <label htmlFor="Sell">Sell</label>
                            <input
                                type="radio"
                                name="rentOrSell"
                                value="Sell"
                                checked={newApartment.rentOrSell === 'Sell'}
                                onChange={handleFormChange}
                            />
                        </div>
                        <label>Size: </label>
                        <input
                            type="number"
                            name="size"
                            value={newApartment.size}
                            onChange={handleFormChange}
                        />
                        <label>Rooms: </label>
                        <input
                            type="number"
                            name="rooms"
                            value={newApartment.rooms}
                            onChange={handleFormChange}
                        />
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={newApartment.price}
                            onChange={handleFormChange}
                        />
                        <div className={"form-btn-div"}>
                            <button className={"form-btn"} type="submit">Save Ad</button>
                            <button className={"form-btn"} type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Apartments;
