import React, { useState, useEffect } from "react";
import { SiDesignernews } from "react-icons/si";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Divider,
  Chip,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@material-ui/core";

// dev
// const socketURL = "http://localhost:3001/";

// production
const socketURL =
  process.env.NODE_ENV === "production"
    ? window.location.hostname
    : "http://localhost:3001/";

const socket = io.connect(socketURL, { secure: true });

const Help = ({ state: base, help, handleHelp }) => {
  const {
    currentUser: { email },
  } = base;

  const { pathname } = useLocation();
  const location = pathname.split("/")[1];

  const personName = email.split("@")[0];
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const renderChat = () => {
    return chat?.map(({ name, message }, idx) => {
      return (
        <div key={idx}>
          <div className="conversation">
            <p className="chatter_name">{name}</p>
            <p className="chatter_message">{message}</p>
          </div>
        </div>
      );
    });
  };

  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message } = state;
    socket.emit("message", { name, message });
    setState({ message: "", name });
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  return (
    <>
      {help ? (
        <div
          className={`helping_section ${location === "home" ? "downer" : null}`}
        >
          {" "}
          <div className="LiveChat">
            <div className="top_chat">
              <h2>Hi {personName}! 👋</h2>
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
              <div className="message_displat">{renderChat()}</div>

              <div className="message_chat">
                <form action="" onSubmit={e => onMessageSubmit(e)}>
                  <div>
                    <TextField
                      className="name_field"
                      name="name"
                      value={state.name}
                      onChange={e => handleChange(e)}
                      variant="outlined"
                      // hidden
                    />
                  </div>
                  <div>
                    <TextField
                      name="message"
                      className="message_field"
                      value={state.message}
                      onChange={e => handleChange(e)}
                      variant="outlined"
                    />
                  </div>
                  <button className="chat_btn">
                    <FiSend />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="help">
        <BsFillChatRightDotsFill
          className="bubble"
          onClick={() => handleHelp()}
        />
      </div>
    </>
  );
};

export default Help;
