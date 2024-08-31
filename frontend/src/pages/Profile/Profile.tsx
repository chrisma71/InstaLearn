import React, { useState } from 'react';
import PlusIcon from './assets/Plus.svg';
import CloseIcon from './assets/Close.svg'; // Add your close icon SVG here

const Profile: React.FC = () => {
    const [academicInterests, setAcademicInterests] = useState<string[]>([
        'Mathematics',
        'Artificial Intelligence (AI)',
        'Science',
        'Chemistry',
        'Edging'
    ]);

    const [goalsProjects, setGoalsProjects] = useState<string[]>([
        'Mathematics',
        'Artificial Intelligence (AI)',
        'Science',
        'Chemistry',
        'Edging'
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [newItem, setNewItem] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

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

    const handleAddItem = () => {
        if (newItem.trim()) {
            if (modalTitle === 'Add Interest') {
                setAcademicInterests([...academicInterests, newItem]);
            } else if (modalTitle === 'Add Project') {
                setGoalsProjects([...goalsProjects, newItem]);
            }
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 w-screen relative">
            {/* Academic Interests Section */}
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

            {/* Goals/Projects Section */}
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

            {/* Modal */}
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
    );
};

export default Profile;
