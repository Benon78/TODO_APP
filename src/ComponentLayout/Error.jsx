import { useRouteError, Link } from "react-router-dom";  
import './Layout.css';  

function Error() {  
    const error = useRouteError();  

    return (  
        <div className="error-container">  
            <h1>Error: {error?.message || "Unexpected error occurred"}</h1>  
            <p>Oops, something went wrong.</p>  
            <p>Please refresh the page or return to the <Link to="/">homepage</Link>.</p>  
            <pre>{error?.status}</pre>  
        </div>  
    );  
}  

export default Error;