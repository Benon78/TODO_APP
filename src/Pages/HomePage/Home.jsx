/** @format */
import { Link } from "react-router-dom";
import "./Home.css";
import heroImage from "../../assets/Images/Home.png";
function Home() {
  return (
    <div className="home-container">
      <div
        className="home-hero-container"
        aria-roledescription="Image of the hero section show the list of todo items">
        <img src={heroImage} alt="hero image" />
      </div>
      <h1>Get things done with TODO</h1>
      <div className="home-content-container">
        <p>
          Streamline your day with our intuitive todo app, seamlessly organizing
          tasks and boosting productivity. Your ultimate tool for efficient task
          management.
        </p>
      </div>
        <Link to='todo' className="link-btn">Get started</Link>
    </div>
  );
}

export default Home;
