import axios from "axios";
import React, { useState } from "react";
import { Message, MessageProp } from "../App";
import { send } from "../assets/icons";
import { url } from "../url";

type InputProps = {
  addMessage: (msg: MessageProp) => void;
  toggleLoading: (value: boolean) => void;
  apiKey: string;
  img: string;
  handlelogout: () => void;
  chatLoading: boolean;
};

export default function Input({
  addMessage,
  toggleLoading,
  apiKey,
  img,
  handlelogout,
  chatLoading,
}: InputProps) {
  const [input, setInput] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState('user');

  function handleInput() {
    const message: Message = { content: input, role: selectedRole}
    addMessage({
      msg: message,
      me: true,
      img,
      _id: new Date().toString(),
    });
    setInput("");
    toggleLoading(true);

    //apiCall
    axios
      .post(`${url}/chatgpt/chat/${apiKey}`, { message })
      .then((resp) => {
        toggleLoading(false);
        addMessage({
          msg: resp.data.message,
          img: undefined,
          _id: resp.data.id,
        });
      });
  }
  return (
    <div
      className="botm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        bottom: "10px",
        width: "100%",
      }}
    >
      <div
        className="input_box"
        style={{
          width: "86%",
          backgroundColor: "#40414f",
          height: "45px",
          borderRadius: "7px",
          marginTop: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "10px",
        }}
      >
        <select 
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        name="roles" 
        id="roles"
        style={{
          background: "#343541",
          fontWeight: "bold",
          color: "white",
          padding: "5px",
          borderRadius: "5px",
        }}
        >
          <option 
          value="user"
          style={{
            margin: "5px"
          }}
          >
            You
          </option>
          <option 
          value="system"
          style={{
            margin: "5px"
          }}
          >System</option>
        </select>
        <input
          disabled={chatLoading}
          autoFocus={true}
          onKeyDown={(e) => e.keyCode === 13 && input != "" && handleInput()}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          style={{
            width: "97%",
            height: "100%",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
            paddingLeft: "8px",
          }}
          placeholder=""
        />
        <button
          onClick={() => handleInput()}
          style={{
            rotate: "90deg",
            marginRight: "13px",
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          {send}
        </button>
      </div>
      <p
        style={{
          fontSize: "13.5px",
          marginTop: "9px",
          cursor: "pointer",
          color: "#bf3838",
          fontWeight: "bold",
        }}
        onClick={() => handlelogout()}
      >
        Logout
      </p>
    </div>
  );
}
