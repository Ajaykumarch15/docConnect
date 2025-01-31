import React, { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext'; // Adjust the import path if necessary

const DoctorProfileImageUpload = () => {
    const { profileData, uploadImage } = useContext(DoctorContext);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            uploadImage(file);  // Call the uploadImage function from context
        }
    };

    return (
        <div>
            <h2>Doctor Profile</h2>
            <img src={profileData?.image} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
            <br />
            <input type="file" onChange={handleImageUpload} />
        </div>
    );
};

export default DoctorProfileImageUpload;
