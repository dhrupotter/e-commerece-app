import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth.context";
import "../Navbar/Navbar.css";
import wishListLogo from "../../assets/wishlist-logo.png";
import homeLogo from "../../assets/home-logo.png";
import cartLogo from "../../assets/cart-logo.png";
import logo from "../../assets/brand-logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <img src={logo}></img>
        <h1 onClick={() => navigate("/home")}>MessyHands</h1>
      </div>

      {user.user !== null ? (
        <>Hello, {user.user.firstName}</>
      ) : (
        <>Hello Guest!</>
      )}

      {user.user === null ? (
        <ul className="nav-list">
          <li>
            <NavLink to={"/products"} className="nav-tab">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to={"/login"} className="nav-tab">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to={"/signup"} className="nav-tab">
              Sign Up
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-list">
          <li>
            <NavLink to={"/products"} className="nav-tab ">
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <img src={homeLogo} className="nav-tab "></img>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/wishlist"} className="nav-tab">
              <img src={wishListLogo}></img>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/cart"} className="nav-tab">
              <img src={cartLogo}></img>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
