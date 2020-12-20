import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "services/firebase";
import { setChats, selectChats } from "store/chat";

function Chat() {
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);
  const [content, setContent] = useState("");

  const user = useMemo(() => auth().currentUser, []);

  useEffect(() => {
    setReadError(null);

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

  const handleChange = useCallback(({ target }) => {
    setContent(target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setWriteError(null);

      try {
        await db.ref("chats").push({
          content: content,
          timestamp: Date.now(),
          uid: user.uid,
        });
        setContent("");
      } catch (e) {
        setWriteError(e.message);
      }
    },
    [content, user.uid]
  );

  return (
    <div>
      <div className="chats">
        {chats.map((chat) => {
          return <p key={chat.timestamp}>{chat.content}</p>;
        })}
        {readError && <p>{readError}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={content}></input>
        {writeError && <p>{writeError}</p>}
        <button type="submit">Send</button>
      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

export default Chat;
