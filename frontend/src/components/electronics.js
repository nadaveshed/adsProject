import React, {useEffect, useState} from "react";
import axios from "axios";
import './electronics.css';
import Modal from "react-modal";

function Electronics() {
    const API_URL = 'http://localhost:8080/api/electronics';
    const headers = {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
    };

    const [advertisements, setAdvertisements] = useState([]);

    const [newElectronic, setNewElectronic] = useState({
        type: '',
        condition: 'New',
        price: '',
    });

    const [showPopup, setShowPopup] = useState(false);
    const [editElectronicId, setEditElectronicId] = useState(null);
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [isFilterOn, setIsFilterOn] = useState(false);
    const [sizeFilter, setSizeFilter] = useState('');
    const [selectedElectronic, setSelectedElectronic] = useState(null);

    const handleMinPriceFilter = (e) => {
        setMinPriceFilter(e.target.value);
    };
    const handleMaxPriceFilter = (e) => {
        setMaxPriceFilter(e.target.value);
    };

    useEffect(() => {
        fetchElectronics().then();
    }, []);

    const fetchElectronics = async () => {
        try {
            const response = await axios.get(API_URL, {headers});
            setAdvertisements(response.data);
        } catch (error) {
            console.error('Error fetching electronics:', error);
        }
    };

    const handleAdd = () => {
        setShowPopup(true);
        setNewElectronic({
            type: '',
            condition: 'New',
            price: '',
        });
        setEditElectronicId(null);
    };

    const handleEdit = (electronic) => {
        setShowPopup(true);
        setNewElectronic({ ...electronic });
        setEditElectronicId(electronic.id);
    };

    const handleDelete = async (electronicId) => {
        try {
            await axios.delete(`${API_URL}/${electronicId}`,{
                headers});
            await fetchElectronics();
        } catch (error) {
            console.error('Error deleting electronic:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewElectronic((prevElectronic) => ({
            ...prevElectronic,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newElectronic)
        try {
            if (editElectronicId) {
                await axios.put(`${API_URL}/${editElectronicId}`, newElectronic, {headers});
            } else {
                await axios.post(API_URL, newElectronic, {headers});
            }
            setShowPopup(false);
            await fetchElectronics();
        } catch (error) {
            console.error('Error submitting electronic:', error);
        }
    };

    const handleCancel = () => {
        setShowPopup(false);
        setNewElectronic({
            type: '',
            condition: 'New',
            price: '',
        });
        setEditElectronicId(null);
    };

    const filteredAdvertisements = advertisements
        .sort((a, b) => a.id - b.id)
        .filter((electronic) => {
        if (!isFilterOn) {
            return true;
        }

        if (!minPriceFilter && !maxPriceFilter) return true;

        const price = parseInt(electronic.price);

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

    const handleSizeFilter = (e) => {
        setSizeFilter(e.target.value);
    };

    const handleAdClick = (electronic) => {
        setSelectedElectronic(electronic);
    };

    const handleClosePopup = () => {
        setSelectedElectronic(null);
    };

    return (
        <div>
            <h1>Electronics Board</h1>

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
                        <th>Condition</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredAdvertisements.map((electronic) => (
                        <tr key={electronic.id} onClick={() => handleAdClick(electronic)}>
                            <td>{electronic.type}</td>
                            <td>{electronic.condition}</td>
                            <td>{electronic.price}</td>
                            <td>
                                <button onClick={() => handleEdit(electronic)}>Edit</button>
                                <button onClick={() => handleDelete(electronic.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <Modal isOpen={showPopup} ariaHideApp={false} title={editElectronicId ? 'Edit Ad' : 'Add New Ad'} onClose={() => setShowPopup(false)}>
                <form onSubmit={handleSubmit}>
                    <div className={"modal-form"}>
                        <h2>{editElectronicId ? 'Edit Ad' : 'Add New Ad'}</h2>
                        <label>Type: </label>
                        <input
                            type="text"
                            name="type"
                            value={newElectronic.type}
                            required
                            onChange={handleFormChange}
                        />
                        <label>Condition:
                            <select name="condition" onChange={handleFormChange}>
                                <option value="New">New</option>
                                <option value="Good">Good</option>
                                <option value="Slightly bad">Slightly bad</option>
                                <option value="Bad">Bad</option>
                            </select>
                        </label>
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={newElectronic.price}
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
export default Electronics;
