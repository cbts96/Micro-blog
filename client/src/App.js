import React from "react";
import "./App.css";
import CreatePost from "./component/PostCreate";
import PostList from "./component/PostList";

function App() {
  return (
    <div>
      <div className="App">
        <h2>Create Post</h2>
        <CreatePost />
        <br />
        <h2>Post</h2>

        <PostList />
      </div>
    </div>
  );
}

export default App;
