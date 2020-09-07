import React, { useState, useEffect } from "react";
import "./PostList.scss";
import Axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [post, setPost] = useState({});
  const fetchPost = async () => {
    const res = await Axios.get("http://posts.com/posts");
    setPost(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const renderPost = Object.values(post).map((value) => {
    return (
      <div className="list-post" key={value.id}>
        <h3 className="title">{value.title}</h3>
        <CommentList comments={value.comments} />
        <CommentCreate postId={value.id} />
      </div>
    );
  });
  return <div className="listpost-wrapper">{renderPost}</div>;
};
export default PostList;
