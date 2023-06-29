import { useAuth } from "../../contexts/auth.context";
import "../Navbar/Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { user } = useAuth();
  console.log(user.user, user.token);
  return (
    <nav className="navbar">
      <h1>BRAND-NAME</h1>
      {user.user !== null ? (
        <>Hello, {user.user.firstName}</>
      ) : (
        <>Hello Guest!</>
      )}
      <ul className="nav-list">
        <li className="nav-tab ">
          <NavLink to={"/products"}>Explore</NavLink>
        </li>
        <li className="nav-tab ">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="nav-tab">
          <NavLink>Wishlist</NavLink>
        </li>
        <li className="nav-tab">
          <NavLink to={"/cart"}>Cart</NavLink>
        </li>
        <li className="nav-tab">
          <NavLink to={"/auth"}>Login/Sign-Up</NavLink>
        </li>
      </ul>
    </nav>
  );
};
