import React from 'react';
import AppNavbar from '../App Navbar/AppNavbar';  // Adjust the path as necessary
import ArticleIcon from './assets/ArticleIcon.svg';  // Icon for articles
import VideoIcon from './assets/VideoIcon.svg';      // Icon for videos
import LiveIcon from './assets/LiveIcon.svg';        // Icon for live streams
import LinkIcon from './assets/LinkIcon.svg';        // Icon for link button
import LikeIcon from './assets/LikeIcon.svg';        // Icon for like button
import SaveIcon from './assets/SaveIcon.svg';        // Icon for save button

const mediaData = [
    {
        type: 'article',
        title: 'Master Organic Chemistry',
        link: 'https://www.masterorganicchemistry.com/',
        description: 'Master Organic Chemistry is the world\'s most useful resource for learning organic chemistry...Master Organic Chemistry is the world\'s most useful resource for learning organic chemistry...Master Organic Chemistry is the world\'s most useful resource for learning organic chemistry...Master Organic Chemistry is the world\'s most useful resource for learning organic chemistry...Master Organic Chemistry is the world\'s most useful resource for learning organic chemistry...',
    },
    {
        type: 'video',
        title: 'Understanding Quantum Physics',
        link: 'https://www.youtube.com/watch?v=xyz',
        description: 'This video provides a deep dive into the world of quantum physics...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
    {
        type: 'live',
        title: 'Live Chemistry Tutorial',
        link: 'https://www.twitch.tv/livechemistry',
        description: 'Join us for a live chemistry tutorial session...',
    },
];

const getIcon = (type: string) => {
    switch (type) {
        case 'article':
            return ArticleIcon;
        case 'video':
            return VideoIcon;
        case 'live':
            return LiveIcon;
        default:
            return '';
    }
};

const ForYouPage: React.FC = () => {
    return (
        <div className="w-screen relative border-2 h-screen">
            <div className=' absolute top-0 left-0 w-full'>
                <AppNavbar />  {/* Add the Navbar at the top */}
            </div>
            <div className="p-6 w-full max-w-4xl mx-auto mt-4"> {/* Added mt-4 to separate content from the navbar */}
                <h1 className="text-2xl font-semibold mb-6 text-center">For You</h1>
                <div className="flex flex-col items-center space-y-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                    {mediaData.map((media, index) => (
                        <div key={index} className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-2xl">
                            <div className="flex items-start">
                                <img src={getIcon(media.type)} alt={media.type} className="w-8 h-8 mr-4 flex-shrink-0" />
                                <div className="flex-grow" style={{ maxWidth: 'calc(100% - 48px)' }}> {/* Adjust maxWidth to prevent overflow */}
                                    <a href={media.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-500 hover:underline">
                                        {media.title}
                                    </a>
                                    <p className="text-gray-600 text-sm">{media.link}</p>
                                    <p className="mt-2 text-gray-700 break-words overflow-hidden text-ellipsis">{media.description}</p> {/* Handle long text */}
                                </div>
                                <a href={media.link} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0">
                                    <img src={LinkIcon} alt="Link" className="w-8 h-8" />
                                </a>
                            </div>
                            <div className="flex justify-start mt-4 space-x-4">
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <img src={LikeIcon} alt="Like" className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">Like</span>
                                </div>
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <img src={SaveIcon} alt="Save" className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm text-gray-600">Save</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForYouPage;