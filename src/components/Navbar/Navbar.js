import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";

import { SlHome, SlHandbag, SlHeart } from "react-icons/sl";

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
        <h1 onClick={() => navigate("/")}>MessyHands</h1>
      </div>
      <div className="hello-user">
        {user.user !== null ? (
          <>Hello, {user.user.firstName}</>
        ) : (
          <>Hello Guest!</>
        )}
      </div>

      {user.user === null ? (
        <ul className="nav-list">
          {/* <li>
            <NavLink to={"/products"} className="nav-tab">
              Explore
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/login"} className="nav-tab-text">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to={"/signup"} className="nav-tab-text">
              SignUp
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
            <NavLink to={"/"} className="nav-tab">
              <SlHome />
            </NavLink>
          </li>
          <li>
            <NavLink to={"/wishlist"} className="nav-tab">
              <SlHeart />
              <span className="nav-btn-qty">{user.user.wishlist.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/cart"} className="nav-tab">
              <SlHandbag />
              <span className="nav-btn-qty">{user.user.cart.length}</span>
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
