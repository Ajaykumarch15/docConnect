import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
    const { currency, backendUrl } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    // For image upload
    const [file, setFile] = useState(null);

    const updateProfile = async () => {
        setLoading(true);
        try {
            const updateData = {
                name: profileData.name,
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available,
                designation: profileData.designation,
            };

            // If a new file is selected, handle file upload
            if (file) {
                const formData = new FormData();
                formData.append("image", file);
                
                const { data: uploadData } = await axios.post(backendUrl + '/api/doctor/upload-image', formData, {
                    headers: {
                        dToken,
                    },
                });

                if (uploadData.success) {
                    updateData.image = uploadData.imageUrl; // Update the image URL
                } else {
                    toast.error(uploadData.message);
                    setLoading(false);
                    return;
                }
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken, getProfileData]);

    return profileData && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img
                        className='bg-primary/80 w-full sm:max-w-64 rounded-lg'
                        src={profileData.image}
                        alt={`${profileData.name}'s Profile`}
                    />
                    {isEdit && (
                        <div>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mt-2"
                            />
                        </div>
                    )}
                </div>

                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {isEdit
                            ? <input
                                type='text'
                                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                                value={profileData.name}
                                className='w-full outline-primary p-2'
                                placeholder='Name'
                              />
                            : profileData.name
                        }
                    </p>

                    {/* ----- Designation ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>Designation:</p>
                        {isEdit
                            ? <input
                                type="text"
                                onChange={(e) => setProfileData(prev => ({ ...prev, designation: e.target.value }))}
                                value={profileData.designation}
                                className='w-full outline-primary p-2'
                                placeholder="Designation"
                              />
                            : profileData.designation
                        }
                    </div>

                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About:</p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {isEdit
                                ? <textarea
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                    value={profileData.about}
                                    className='w-full outline-primary p-2'
                                    rows={8}
                                  />
                                : profileData.about
                            }
                        </p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>
                        Appointment fee: <span className='text-gray-800'>
                            {currency} {isEdit
                                ? <input
                                    type='number'
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                    value={profileData.fees}
                                  />
                                : profileData.fees
                            }
                        </span>
                    </p>

                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isEdit
                                ? <input
                                    type='text'
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                    value={profileData.address.line1}
                                  />
                                : profileData.address.line1
                            }
                            <br />
                            {isEdit
                                ? <input
                                    type='text'
                                    onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                    value={profileData.address.line2}
                                  />
                                : profileData.address.line2
                            }
                        </p>
                    </div>

                    <div className='flex gap-1 pt-2'>
                        <input
                            type="checkbox"
                            onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                            checked={profileData.available}
                        />
                        <label>Available</label>
                    </div>

                    {isEdit
                        ? <button
                            onClick={updateProfile}
                            className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
                            disabled={loading}
                          >
                            {loading ? 'Saving...' : 'Save'}
                          </button>
                        : <button
                            onClick={() => setIsEdit(prev => !prev)}
                            className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'
                          >
                            Edit
                          </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
