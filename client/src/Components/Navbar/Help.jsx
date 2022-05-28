import React from "react";
import { SiDesignernews } from "react-icons/si";
import { BsFillChatRightDotsFill } from "react-icons/bs";

const Help = () => {
  return (
    <>
      <div className="LiveChat">
        <div className="top_chat">
          <h2>Hi There! 👋</h2>
          <h5>You need any help?</h5>
        </div>

        <div className="middle_chat">
          <h5 className="middle_chat_title">Start a conversation</h5>
          <div className="reply_time">
            <div className="avatars">
              <div
                className="im1 im_avat"
                style={{ background: "url(https://picsum.photos/250)" }}
              ></div>
              <div
                className="im2 im_avat"
                style={{ background: "url(https://picsum.photos/220)" }}
              ></div>
              <div
                className="im3 im_avat"
                style={{ background: "url(https://picsum.photos/260)" }}
              ></div>
            </div>
            <div className="desc_chat">
              <p className="desc_chat_text">
                Our usual reply time
                <br />
                🕦 under 10 minutes
              </p>
            </div>
          </div>
        </div>

        <div className="chat_section">
          <div className="message_displat">hey there! how can we help</div>

          <div className="message_chat">Hi.. i need </div>
        </div>
      </div>

      <div className="help">
        <BsFillChatRightDotsFill className="bubble" />
      </div>
    </>
  );
};

export default Help;
