import React, { useState } from "react";
import "./CommentCreate.scss";
import Axios from "axios";

const CommentCreate = ({postId}) => {
  const [content, setConent] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    await Axios.post(`http://posts.com/posts/${postId}/comments`, { content });
    setConent("");
  };
  const handleChange = (event) => {
      
      setConent(event.target.value);
    };
  
  return (
    <div className="comment-create">
      <form onSubmit={handleSubmit}>
        <div className="comment">
          <label>New Comment</label>
          <input
            value={content}
            onChange={handleChange}
            className="input"
          ></input>
          <button className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CommentCreate;
