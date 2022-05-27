// CORE
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

// STYLES
import "./styles/Character.scss";

// COMPONENTS
import { YouTubeVideo } from "../../components/YouTubeVideo/YouTubeVideo";

const Character = () => {
    const [characterStats, setCharacterStats] = useState(null);
    const [characterHomeworld, setCharacterHomeworld] = useState(null);
    const [wikiScraperFileContent, setWikiScraperFileContent] = useState(null);

    const characterObjectRef = useLocation();

    useEffect(() => {
        setCharacterStats(characterObjectRef.state.character);
        
        fetch(characterObjectRef.state.character.homeworld)
            .then(response => response.json())
            .then(homeworld => setCharacterHomeworld(homeworld.name));

        fetch(`http://localhost:3745/wiki-scraper/read-data/${characterObjectRef.state.character.name}`, {
            method: "POST"
        })
            .then(response => response.json())
            .then(text => setWikiScraperFileContent(text.fileContent));

        console.log(characterObjectRef.state.character);
    }, []);

    const renderCharacterStats = () => {
        return (
            <div className="character-stats-youtube-video-container">
                <div className="character-stats-container">
                    <p className="character-name">Name: {characterStats.name}</p>
                    <p className="character-eye-color">Eye Color: {characterStats.eye_color[0].toUpperCase() + characterStats.eye_color.slice(1)}</p>
                    <Link to={`/worlds/${characterHomeworld}`} className="character-homeworld" state={{ homeworldURL: characterStats.homeworld }}>{characterHomeworld}</Link>
                </div>
                {/* <YouTubeVideo /> */}
            </div>
        );
    }

    return (
        <div className="character-outer-container">
            <div className="character-inner-container">
                {
                    characterStats === null
                    ? null
                    :
                    (
                        <>
                            {renderCharacterStats()}
                            {
                            wikiScraperFileContent === null
                            ? null
                            :
                            (
                                <div className="wiki-scraper-container">
                                    <p className="wiki-scraper-content">{wikiScraperFileContent}</p>
                                </div>
                            )
                            }
                        </>
                    )
                }
            </div>
        </div>
    );
};

export { Character };
