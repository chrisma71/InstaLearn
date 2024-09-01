import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavbar from '../App Navbar/AppNavbar';
import ArticleIcon from './assets/ArticleIcon.svg';
import VideoIcon from './assets/VideoIcon.svg';
import LiveIcon from './assets/LiveIcon.svg';
import LinkIcon from './assets/LinkIcon.svg';
import LikeIcon from './assets/LikeIcon.svg';
import SaveIcon from './assets/SaveIcon.svg';

interface MediaData {
    type: 'article' | 'video' | 'live';
    url: string;
    title: string;
    description: string;
}

const getIcon = (type: 'article' | 'video' | 'live') => {
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

const extractYouTubeId = (url: string): string | null => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
};

const ForYouPage: React.FC = () => {
    const [mediaData, setMediaData] = useState<MediaData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const generateContent = async () => {
            setLoading(true);
            try {
                const prompt = `
                  Create a list of 10 educational articles, resources, or videos, based on someone wanting to start learning the quadratic formula. Have a fun description!
                  Provide the list in the following JSON format:
                  {
                    "links": [
                      {"type": "article" | "video" | "live", "url": "https://example.com/article", "title": "Example Title", "description": "Example Description"}
                    ]
                  }
                `;
                const response = await axios.post('http://localhost:5000/api/upload', { prompt });
                const rawLinksData = response.data.description;
                console.log(rawLinksData);
                const jsonString = rawLinksData.replace(/```json\n|\n```/g, '').trim();
                const linksData = JSON.parse(jsonString);

                setMediaData(linksData.links);

                // Uncomment if using LinkPreview API
                /*
                const previews = await Promise.all(
                    linksData.links.map(async (link: { type: string; url: string }) => {
                        const previewResponse = await axios.get('http://localhost:5000/api/preview', {
                            params: { url: link.url }
                        });
                        return {
                            type: link.type as 'article' | 'video' | 'live',
                            url: link.url,
                            title: previewResponse.data.title,
                            description: previewResponse.data.description
                        };
                    })
                );
                setMediaData(previews);
                */
            } catch (error) {
                console.error('Error generating content:', error);
            } finally {
                setLoading(false);
            }
        };

        generateContent();
    }, []);

    return (
        <div className="w-screen relative border-2 h-screen">
            <div className="absolute top-0 left-0 w-full">
                <AppNavbar />
            </div>
            <div className="p-6 w-full max-w-4xl mx-auto mt-4">
                <h1 className="text-2xl font-semibold mb-6 text-center">For You</h1>

                {loading ? (
                    <p className="text-center">Compiling your feed, please wait...</p>
                ) : (
                    <div className="flex flex-col items-center space-y-4 overflow-y-auto" style={{ maxHeight: '80vh' }}>
                        {mediaData.map((media, index) => (
                            <div key={index} className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm w-full max-w-2xl">
                                <div className="flex items-start">
                                    <img src={getIcon(media.type)} alt={media.type} className="w-8 h-8 mr-4 flex-shrink-0" />
                                    <div className="flex-grow" style={{ maxWidth: 'calc(100% - 48px)' }}>
                                        <a href={media.url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-500 hover:underline">
                                            {media.title}
                                        </a>
                                        <p className="text-gray-600 text-sm">{media.url}</p>
                                        <p className="mt-2 text-gray-700 break-words overflow-hidden text-ellipsis">{media.description}</p>
                                        {media.type === 'video' && extractYouTubeId(media.url) && (
                                            <div className="mt-4">
                                                <iframe
                                                    width="100%"
                                                    height="315"
                                                    src={`https://www.youtube.com/embed/${extractYouTubeId(media.url)}`}
                                                    title={media.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="rounded-lg"
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>
                                    <a href={media.url} target="_blank" rel="noopener noreferrer" className="ml-4 flex-shrink-0">
                                        <img src={LinkIcon} alt="Link" className="w-8 h-8" />
                                    </a>
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <div className="px-4">
                                    <div className="flex justify-start space-x-4">
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForYouPage;
