import React from "react";
import "./Footer.css";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="data-section">
        <p className="company-rights">
          <AiOutlineCopyright /> 2023 MessyHands. All rights Reserved.
        </p>
        <div className="policy-links">
          <a href="/">Terms & Condition</a>•<a href="/">Shipping Policy</a>•
          <a href="/">Cancellation Policy</a>•<a href="/">Privacy Policy</a>
        </div>
      </div>

      <div className="developer">
        <div>
          MessyHands made with 🤍 by{" "}
          <Link to={"https://dhrupotter.netlify.app/"} target="_blank">
            dhruviGandhi
          </Link>
        </div>
        <div className="social-media">
          <Link to={"https://github.com/dhrupotter"} target="_blank">
            <BsGithub />
          </Link>
          <Link to={"https://twitter.com/DhruviGandhi25"} target="_blank">
            <BsTwitter />
          </Link>
          <Link
            to={"https://www.linkedin.com/in/dhruvi-gandhi-609a35166/"}
            target="_blank"
          >
            <BsLinkedin />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
