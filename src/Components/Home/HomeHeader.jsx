// the banner
import { AiOutlineClose } from "react-icons/ai";

const Banner = ({ closeOBR, currentUser }) => {
  return (
    <div className="home_header">
      <div className="home_header_prompt">
        <h2>Good Morning, {currentUser.email.split("@")[0]}</h2>
        <p>Get to know our services by starting your onboarding</p>
        <button>Launch onboarding</button>
      </div>
      <button className="home_toggle_onboarding" onClick={() => closeOBR()}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default Banner;
