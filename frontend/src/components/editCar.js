import React, {useState} from "react";
import './cars.css';
import Modal from "react-modal";
import axios from "axios";

const EditCar = (props, {setEditedData }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         id: props.id,
//         manufacturer: props.manufacturer,
//         model: props.model,
//         year: props.year,
//         hand: props.hand,
//         paint: props.paint,
//         distance: props.distance,
//         price: props.price,
//     });
//
//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Send the updated advertisement data to the backend API for saving changes
//         axios.put(`http://localhost:8080/api/cars/${props.id}`, formData)
//             .then((response) => {
//                 console.log('Advertisement updated:', response.data);
//                 setFormData(response.data);
//                 setIsModalOpen(false); // Close the modal after successful update
//             })
//             .catch((error) => {
//                 console.error('Error updating advertisement:', error);
//             });
//     };
//
//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//     };
//
//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         props.onClose();
//     };
//
//     return (
//         <div>
//             <button onClick={handleOpenModal}>Edit</button>
//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={handleCloseModal}
//                 contentLabel="Edit Advertisement Modal"
//                 ariaHideApp={false}
//             >
//                 <h2>Edit Advertisement</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>Manufacturer:
//                         <input
//                             type="text"
//                             name="type"
//                             value={formData.manufacturer}
//                             onChange={handleChange}
//                             required
//                         />
//                     </label>
//                     <label>Model:
//                         <input
//                             type="text"
//                             name="model"
//                             value={formData.model}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>Year:
//                         <input
//                             type="number"
//                             name="year"
//                             min="1970"
//                             value={formData.year}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>Hand:
//                         <input
//                             type="number"
//                             name="hand"
//                             min="0"
//                             value={formData.hand}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label htmlFor="cars">Paint:
//                         <select id="cars" name="carlist" form="carform" value={formData.paint}>
//                             <option value="volvo">Volvo</option>
//                             <option value="saab">Saab</option>
//                             <option value="opel">Opel</option>
//                             <option value="audi">Audi</option>
//                         </select>
//                     </label>
//                     <label>Distance:
//                         <input
//                             type="number"
//                             name="distance"
//                             min="0"
//                             value={formData.distance}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <label>Price:
//                         <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                         />
//                     </label>
//                     <button type="submit">Update Advertisement</button>
//                     <button type="button" onClick={handleCloseModal}>Cancel</button>
//                 </form>
//             </Modal>
//         </div>
//     );
}
export default EditCar;

