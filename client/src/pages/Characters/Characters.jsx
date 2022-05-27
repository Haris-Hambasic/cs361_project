// CORE
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// STYLES
import "./styles/Characters.scss";

// COMPONENTS
import { YouTubeVideo } from "../../components/YouTubeVideo/YouTubeVideo";

const Characters = () => {
    const [characters, setCharacters] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://swapi.dev/api/people")
                .then(response => response.json())
                .then(characters => {
                    setCharacters([...characters.results]);
                });
        };

        fetchData();

        console.log("CHARACTERS:", characters);
    }, []);

    return (
        <div className="characters-outer-container">
            <div className="characters-inner-container">
                {/* <YouTubeVideo /> */}
                {characters === null ? null : characters.map(character => (
                    <Link to={`/characters/${character.name}`} state={{ character }} className="character-container">
                        <p className="characters-character-name">{character.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export { Characters };
