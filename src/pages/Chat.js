import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "services/firebase";
import { setChats, selectChats } from "store/chat";

function Chat() {
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  const [readError, setReadError] = useState();
  const [writeError, setWriteError] = useState();
  const [content, setContent] = useState();

  const user = useMemo(() => auth().currentUser, []);

  useEffect(() => {
    setReadError();

    try {
      db.ref("chats").on("value", (snapshot) => {
        const chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        dispatch(setChats(chats));
      });
    } catch (e) {
      setReadError(e.message);
    }
  }, [dispatch]);

  return (
    <div>
      <div className="chats">
        {chats.map((chat) => {
          return <p key={chat.timestamp}>{chat.content}</p>;
        })}
      </div>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

export default Chat;
