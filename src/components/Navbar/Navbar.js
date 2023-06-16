import "../Navbar/Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <h1>BRAND-NAME</h1>
      <ul className="nav-list">
        <li className="nav-tab ">Home</li>
        <li className="nav-tab">Wishlist</li>
        <li className="nav-tab">Cart</li>
      </ul>
    </div>
  );
};
