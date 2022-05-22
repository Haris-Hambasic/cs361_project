// CORE
import { Link } from "react-router-dom";

// COMPONENTS
import { Header } from "../../components/Header/Header";

// STYLES
import "./styles/Home.scss";

const Home = () => {
    return (
        <div>
            {/* <Header /> */}
            <div className="home-page-outer-container">
                <div className="home-page-inner-container">
                    <div className="hero-container">
                        <h1 className="hero-calling">The Ultimate Star Wars Guide!</h1>
                        <p className="hero-calling-supporting">
                            Look up and discover trivia about your favorite Star Ware characters,
                            starships, and everything else Star Wars! Sign up and create an account
                            to connect with others and share your favorites with other members!
                        </p>
                    </div>
                    <div className="home-page-content-container">
                        <Link to="/characters" className="home-page-link">
                            <div className="home-page-characters">
                                <p className="home-page-character-dispaly">Characters</p>
                            </div>
                        </Link>
                        <Link to="/starships" className="home-page-link">
                            <div className="home-page-starships">
                                <p className="home-page-starships-dispaly">Starships</p>
                            </div>
                        </Link>
                        <Link to="/other" className="home-page-link">
                            <div className="home-page-other">
                                <p className="home-page-other-dispaly">Other</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Home };
