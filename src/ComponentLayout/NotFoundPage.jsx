import './NotFoundPage.css';  
import { Link } from 'react-router-dom';  

const NotFoundPage = () => {  
  return (  
    <div className='not-found-container'>  
      <h1>Page Not Found</h1>  
      <p>The page you are looking for does not exist.</p>  
      <p>It may have been removed, renamed, or did not exist in the first place.</p>  
      <Link to='/' className='link-btn'>Return to Homepage</Link>  
      {/* Optional: Add an illustrative image */}  
      {/* <img src="path/to/404-image.png" alt="404 Not Found" /> */}  
    </div>  
  );  
}  

export default NotFoundPage;