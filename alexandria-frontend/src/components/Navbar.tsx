import { Link } from 'react-router-dom';


const logo = require('../assets/logo.png');

export default function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Alexandria" width={200}/>
                </Link>
                <button
                 className="navbar-toggler"
                 type="button" 
                 data-bs-toggle="collapse" 
                 data-bs-target="#navbarSupportedContent" 
                 aria-controls="navbarSupportedContent" 
                 aria-expanded="false" 
                 aria-label="Toggle navigation"
                 >
                <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="btn btn-outline-light" to="/add-item">
                  Add Item
                </Link>
            </div>
        </nav>
    </div>
  )
}
