import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import PlusIcon from './assets/Plus.svg';
import CloseIcon from './assets/Close.svg';
import AppNavbar from '../App Navbar/AppNavbar'; 

const Profile: React.FC = () => {
    const [academicInterests, setAcademicInterests] = useState<string[]>([]);
    const [goalsProjects, setGoalsProjects] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [newItem, setNewItem] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            const username = Cookies.get('username');

            if (!username) {
                console.error('Username not found in cookies');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    params: { username }
                });
                const { interests, goals } = response.data;
                setAcademicInterests(interests);
                setGoalsProjects(goals);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    const openModal = (title: string) => {
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewItem('');
        setIsButtonEnabled(false);
    };

    const handleInputChange = (value: string) => {
        setNewItem(value);
        setIsButtonEnabled(value.trim() !== '');
    };

    const handleAddItem = async () => {
        if (newItem.trim()) {
            if (modalTitle === 'Add Interest') {
                setAcademicInterests([...academicInterests, newItem]);
                await updateUserProfile([...academicInterests, newItem], goalsProjects);
            } else if (modalTitle === 'Add Project') {
                setGoalsProjects([...goalsProjects, newItem]);
                await updateUserProfile(academicInterests, [...goalsProjects, newItem]);
            }
            closeModal();
        }
    };

    const updateUserProfile = async (interests: string[], goals: string[]) => {
        const username = Cookies.get('username');

        if (!username) {
            console.error('Username not found in cookies');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/api/users/profile', {
                username,
                interests,
                goals
            });
            console.log(response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className='relative'>
            <div className='absolute top-0 left-0 w-full z-10'>
                <AppNavbar />
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen p-6 w-screen relative">
                <div className="mb-6 p-4 bg-white border border-gray-400 rounded-lg shadow-sm w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">Academic Interests</h2>
                        <div
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => openModal('Add Interest')}
                        >
                            <img src={PlusIcon} alt="Add" className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-gray-500 mb-4">Add some interests for our algorithm to better personalize your feed.</p>
                    <hr className="border-gray-300 mb-4" />
                    <div>
                        {academicInterests.map((interest, index) => (
                            <div key={index} className="text-gray-800 mb-2">
                                {interest}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 bg-white border border-gray-400 rounded-lg shadow-sm w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold">Goals/Projects</h2>
                        <div
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            onClick={() => openModal('Add Project')}
                        >
                            <img src={PlusIcon} alt="Add" className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-gray-500 mb-4">
                        Set your goals and ongoing projects here. This will help our algorithm understand your aspirations and see what you’re working on, making it easier to support your journey.
                    </p>
                    <hr className="border-gray-300 mb-4" />
                    <div>
                        {goalsProjects.map((project, index) => (
                            <div key={index} className="text-gray-800 mb-2">
                                {project}
                            </div>
                        ))}
                    </div>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold">{modalTitle}</h1>
                                <div
                                    className="cursor-pointer"
                                    onClick={closeModal}
                                >
                                    <img src={CloseIcon} alt="Close" className="w-6 h-6" />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="Enter new item"
                                value={newItem}
                                onChange={(e) => handleInputChange(e.target.value)}
                            />
                            <div
                                className={`text-white cursor-pointer text-center py-2 px-4 rounded ${
                                    isButtonEnabled
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-gray-400'
                                } transition-colors`}
                                onClick={isButtonEnabled ? handleAddItem : undefined}
                            >
                                Add
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
