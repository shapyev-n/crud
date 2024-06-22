import { useEffect, useRef, useState } from "react";
import scss from "./Message.module.scss";
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";

const avatar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzRXoJTay50rKEdKKaI9s-Ci_l63AqKotCQ&s";

const Message = () => {
  const { user } = useAuth();
  const { addComment, getComments, comments, deleteComment } = useProduct();

  const [value, setValue] = useState("");
  const commentsEndRef = useRef(null);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  function handleInp(e) {
    setValue(e.target.value);
  }
  const date = new Date();

  function handleAddComment() {
    if (value.trim() === "") return;

    const newComment = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      txt: value,
      date: date.toLocaleString(),
    };
    addComment(newComment);
    setValue("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAddComment();
    }
  }

  function scrollToBottom() {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="container">
      <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
        <div id={scss.message}>
          <div className={scss.h1}>
            <h1>Messages:</h1>
          </div>
          <div className={scss.message}>
            {comments.map((el) =>
              user.email === el.email ? (
                <div key={el.id} className={scss.myMessage}>
                  <img
                    onClick={() => {
                      deleteComment(el.id);
                    }}
                    src={el.image === null ? avatar : el.image}
                    alt=""
                  />
                  <div className={scss.user}>
                    {user ? (
                      <div className={scss.userInfo}>
                        {/* <p>{el.name === "" ? el.email : el.name}</p> */}
                        <span>your message:</span>
                      </div>
                    ) : (
                      <p>user@</p>
                    )}
                    <span>{el.txt}</span>
                    <span className={scss.date}>{el.date}</span>
                  </div>
                </div>
              ) : (
                <div key={el.id} className={scss.users}>
                  <img src={el.image === null ? avatar : el.image} alt="" />
                  <div className={scss.user}>
                    {user ? (
                      <div className={scss.userInfo}>
                        <p>{el.name === "" ? el.email : el.name}</p>
                      </div>
                    ) : (
                      <p>user@</p>
                    )}
                    <span>{el.txt}</span>
                    <span className={scss.date}>{el.date}</span>
                  </div>
                </div>
              )
            )}
            <div ref={commentsEndRef}></div>
          </div>
          <div className={scss.send}>
            <input
              onChange={handleInp}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Enter your message..."
              value={value}
            />
            <button onClick={handleAddComment}>send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
