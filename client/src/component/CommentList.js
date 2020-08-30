import React from "react";
import "./CommentList.scss";


const CommentList = ({ comments }) => {


  const renderCommmentList = comments.map((value) => {
    
    
    return (
      
      <ul key={value.id}>
        <li>{value.content}</li>
      </ul>
    );
  });
  return <div>{renderCommmentList}</div>;
};
export default CommentList;
