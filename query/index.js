const express = require("express");
const Axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/event", (req, res) => {
  const { data, type } = req.body;
  if (type === "PostCreated") {
    const { title, id } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { postId, id, content, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }

  console.log(posts);
  res.send({});
});
const port = 4002;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
