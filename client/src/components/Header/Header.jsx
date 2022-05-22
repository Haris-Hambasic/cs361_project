// CORE
import { Link } from "react-router-dom";

// STYLES
import "./styles/Header.scss";

const Header = () => {
    return (
        <div className="header-outer-container">
            <div className="header-inner-container">
                <div className="header-logo-container">
                    <h1 className="header-logo">Star Wars: Trivia</h1>
                </div>
                <div className="header-links-container">
                    <Link to="/characters" className="header-link">Characters</Link>
                    <Link to="/starships" className="header-link">Starships</Link>
                    <Link to="/other" className="header-link">Other</Link>
                </div>
            </div>
        </div>
    );
};

export { Header };
