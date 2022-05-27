// CORE
import { useEffect, useState } from "react";

// STYLES
import "./styles/YouTubeVideo.scss";

const YouTubeVideo = () => {
    const [youtubeURLs, setYouTubeURLs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3745/simba/get-videos", {
            method: "POST",
            body: JSON.stringify({
                videoTitle: "Los Angeles",
                numVideos: 5
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": '*'
            }
        })
            .then(response => response.json())
            .then(youtubeVideos => {
                console.log(youtubeVideos);
                youtubeVideos.map(youtubeVideo => {
                    setYouTubeURLs([...youtubeURLs, youtubeVideo.videoURL]);
                });
            });
    }, []);

    return (
        <div className="youtube-video-outer-container">
            <div className="youtube-video-inner-container">
                {youtubeURLs === null ? null : youtubeURLs.map((youtubeURL, index) => <iframe src={youtubeURL} key={index} className="youtube-video-iframe"></iframe>)}
            </div>
        </div>
    );
};

export { YouTubeVideo };
