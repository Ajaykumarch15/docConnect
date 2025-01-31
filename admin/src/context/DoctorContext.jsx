import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);

    // Function to upload profile image
    const uploadImage = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const { data } = await axios.post(backendUrl + '/api/doctor/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    dToken
                }
            });

            if (data.success) {
                toast.success(data.message);
                getProfileData(); // Re-fetch profile data after uploading the image
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting Doctor appointment data from Database using API
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });

            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Getting Doctor profile data from Database using API
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } });
            setProfileData(data.profileData);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to cancel doctor appointment using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData(); // Refresh dashboard data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // Function to mark appointment completed using API
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                getAppointments();
                getDashData(); // Refresh dashboard data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } });

            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        dToken, setDToken, backendUrl,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData, getDashData,
        profileData, setProfileData,
        getProfileData,
        uploadImage, // Added the uploadImage function to context
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
