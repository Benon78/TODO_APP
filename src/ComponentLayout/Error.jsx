import { useRouteError } from "react-router-dom"
import './Layout.css'
function Error() {
    const error = useRouteError()
  return (
    
    <div className="error-container">
        <h1>Error: {error.message}</h1>
        <p>Oops, something went wrong.</p>
        <pre>{error.status}</pre>
    </div>
  )
}

export default Error