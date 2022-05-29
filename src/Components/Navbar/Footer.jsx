import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { FaCcVisa } from "react-icons/fa";
import { FaPaypal } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { SiFsecure } from "react-icons/si";
import Help from "./Help";

function Footer({ state }) {
  const [help, setHelp] = useState(false);

  const handleHelp = () => {
    setHelp(!help);
  };

  return (
    <div className="footer_section">
      <div className="footerLinks">
        <div className="general">
          <h3>GENERAL</h3>
          <ul>
            <li>Services</li>
            <li>Customer service</li>
            <li>our Clients</li>
          </ul>
        </div>
        <div className="general">
          <h3>PRODUCTS</h3>
          <ul>
            <li>APIs</li>
            <li>Newsletter</li>
            <li>Market Research</li>
          </ul>
        </div>
        <div className="general">
          <h3>ABOUT</h3>
          <ul>
            <li>About us</li>
            <li>Management</li>
            <li>News</li>
          </ul>
        </div>
        <div className="general">
          <h3>RESOURCES</h3>
          <ul>
            <li>On-demand Training</li>
            <li>Reporting</li>
          </ul>
        </div>
        <div className="general">
          <ul>
            <div className="problem">
              <Help state={state} help={help} handleHelp={handleHelp} />
            </div>
            <li>Contact us</li>
            <li>FAQ</li>
            <li>Blog</li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="social_links">
        <div className="social">
          <BsTwitter className="socialIcons" />
          <FaFacebookF className="socialIcons" />
          <BsYoutube className="socialIcons" />
          <AiFillInstagram className="socialIcons" />
        </div>
        <div className="sponsors">
          <SiFsecure className="sponsorIcons" />
          <FaPaypal className="sponsorIcons" />
          <FaCcVisa className="sponsorIcons" />
          <FaCcMastercard className="sponsorIcons" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
