import React, { useEffect, useRef, useState } from "react";
import { MessageProp } from "../App";
import { Circles } from "react-loader-spinner";
import Message from "./Message";

type MessagesProps = {
  messages: MessageProp[];
  show: boolean;
};

export default function Messages({ messages, show }: MessagesProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(updateScroll, [messages]);

  function updateScroll() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="msg_cont"
      style={{
        width: "85%",
        margin: "auto",
        marginTop: "2.5vh",
        overflowY: "scroll",
      }}
    >
      <>
        {messages.map((item) => {
          return (
            <div ref={scrollRef} key={item._id}>
              <Message
                me={item.me}
                msg={item.msg}
                img={item.img}
                _id={item._id}
                key={item._id}
              />
            </div>
          );
        })}
      </>
      {show && (
          <Circles
            height="80"
            width="80"
            color="#00BFFF  "
            ariaLabel="circles-loading"
            wrapperStyle={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            wrapperClass=""
            visible={true}
          />
      )}
    </div>
  );
}
