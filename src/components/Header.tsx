import { NavLink } from "react-router-dom";

export const Header = () => {
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/models">Model Viewer</NavLink>
                </li>
            </ul>
        </nav>
    )
}