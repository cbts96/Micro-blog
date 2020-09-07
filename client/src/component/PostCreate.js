import React, { useState } from "react";
import "./PostCreate.scss";
import Axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const SubmitForm = async (event) => {
    event.preventDefault();
    await Axios.post("http://posts.com/posts/create", { title });
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={SubmitForm}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button className="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
