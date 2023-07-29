import React, {useState} from "react";
import './apartments.css';
import Modal from "react-modal";
import axios from "axios";

const EditApartment = (props, { onEditData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: props.id,
        type: props.type,
        rentOrSell: props.rentOrSell,
        size: props.size,
        rooms: props.rooms,
        price: props.price,
    });

     const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the updated advertisement data to the backend API for saving changes
        axios.put(`http://localhost:8080/api/apartments/${props.id}`, formData)
            .then((response) => {
                console.log('Advertisement updated:', response.data);
                setFormData(formData);
                // onEditData(response.data);
                setIsModalOpen(false); // Close the modal after successful update
            })
            .catch((error) => {
                console.error('Error updating advertisement:', error);
            });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        props.onClose(); // Call the onClose function from props to close the popup
    };

    return (
        <div>
            <button onClick={handleOpenModal}>Edit</button>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Edit Advertisement Modal"
                ariaHideApp={false}>
            >
                <h2>Edit Advertisement</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Type:
                        <input type="text" name="type" value={formData.type} onChange={handleChange} />
                    </label>
                    <label>Choose for rent or sell:
                        <label htmlFor="rent">rent</label>
                        <input
                            type="radio"
                            name="rentOrSell"
                            value="rent"
                            checked={formData.rentOrSell === 'rent'}
                            onChange={handleChange}
                        />
                        <label htmlFor="sell">sell</label>
                        <input
                            type="radio"
                            name="rentOrSell"
                            value="sell"
                            checked={formData.rentOrSell === 'sell'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Enter your rooms:
                        <input
                            type="number"
                            name="rooms"
                            value={formData.rooms}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Enter your size:
                        <input
                            type="number"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                    </label>
                    <label>Enter your price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Update Advertisement</button>
                    <button type="button" onClick={handleCloseModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
}
export default EditApartment;

