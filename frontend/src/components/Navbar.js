import React, { useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="{`$Nav_container   ${isScrolled &&   scrolled}`}">
      <div className="Nav_wrapper">
        <div className="Nav_left">
          <img
            className="Logo"
            src="https://res.cloudinary.com/dehghhzey/image/upload/v1684640390/logo_glmbmg.jpg"
            alt="logo"
          />
        </div>
        <div className="Nav_center">
          <ul className="Nav_list">
            <li className="Nav_listItem">
              <a href="#">Home</a>
            </li>
            <li className="Nav_listItem">
              <a href="#items">Items</a>
            </li>

            <li className="Nav_listItem">
              <a href="#contacts">Contacts</a>
            </li>
            <li className="Nav_listItem">
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </div>
        <div className="Nav_right">
          <AiOutlineUser className="UserIcon" />
          <AiOutlineShoppingCart className="CartIcon" />
          <div className="Nav_CartQuantity">{products.length}</div>
          <button onClick={handleLogout} className="Logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
