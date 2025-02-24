import './NotFoundPage.css'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to='/' className='link-btn'>Return to Homepage</Link>
  
    </div>
  )
}

export default NotFoundPage