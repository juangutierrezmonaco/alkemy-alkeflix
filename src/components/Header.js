import { Link } from "react-router-dom";
import { useFavs } from "../context/FavsContext";
import Buscador from './Buscador'

function Header() {
    const { favMovies } = useFavs();
    const favsQuantity = favMovies.length;

    return (
        <header className="navbar bg-black text-gray-200 flex justify-between">
            <div>
                <div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/listado'>Listado</Link></li>
                            <li><Link to='/favoritos'>Favoritos</Link></li>
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl">AlkeFlix</Link>
                </div>

                <nav className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/listado'>Listado</Link></li>
                        <li>
                            <Link to='/favoritos'>Favoritos</Link>     
                            {favsQuantity > 0 && <span className="indicator-item badge badge-primary pointer-events-none">{favsQuantity}</span> }
                        </li>
                    </ul>
                </nav>
            </div>

            <Buscador />
        </header>
    )
}

export default Header;