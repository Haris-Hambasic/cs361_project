// STYLES
import "./styles/Characters.scss";

// COMPONENTS
import { YouTubeVideo } from "../../components/YouTubeVideo/YouTubeVideo";

const Characters = () => {
    return (
        <div className="characters-outer-container">
            <div className="characters-inner-container">
                <YouTubeVideo />
            </div>
        </div>
    );
};

export { Characters };
