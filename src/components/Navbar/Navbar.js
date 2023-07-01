import { NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/auth.context";
import "../Navbar/Navbar.css";
import wishListLogo from "../../assets/wishlist-logo.png";
import homeLogo from "../../assets/home-logo.png";
import cartLogo from "../../assets/cart-logo.png";
import logo from "../../assets/brand-logo.png";

export const Navbar = () => {
  const { user } = useAuth();
  console.log(user.user, user.token);
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <img src={logo}></img>
        <h1>MessyHands</h1>
      </div>

      {user.user !== null ? (
        <>Hello, {user.user.firstName}</>
      ) : (
        <>Hello Guest!</>
      )}

      {user.user === null ? (
        <ul className="nav-list">
          <li className="nav-tab ">
            <NavLink to={"/products"}>Explore</NavLink>
          </li>
          <li className="nav-tab">
            <NavLink to={"/auth"}>Login/Sign-Up</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-list">
          <li className="nav-tab ">
            <NavLink to={"/products"}>Explore</NavLink>
          </li>
          <li className="nav-tab ">
            <NavLink to={"/"}>
              <img src={homeLogo}></img>
            </NavLink>
          </li>
          <li className="nav-tab">
            <NavLink to={"/wishlist"}>
              <img src={wishListLogo}></img>
            </NavLink>
          </li>
          <li className="nav-tab">
            <NavLink to={"/cart"}>
              <img src={cartLogo}></img>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
