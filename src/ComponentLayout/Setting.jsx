
import './Layout.css'
import { actionLogout } from './Hooks/utils'
function Setting() {
  return (
    <div className="setting-container">
           <h1>Setting Page</h1>

          <button className="link-btn" onClick={actionLogout}>Log Out</button>
    </div>
  )
}

export default Setting