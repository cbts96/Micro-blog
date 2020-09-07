const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
const Axios = require("axios");

app.use(cors());
app.use(express.json());
const commentByPost = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPost[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comment = commentByPost[req.params.id] || [];

  comment.push({ id: id, content, status: "pending" });
  commentByPost[req.params.id] = comment;
  await Axios.post("http://event-bus-srv:4005/event", {
    type: "CommentCreated",
    data: {
      id: id,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(200).send(comment);
});
app.post("/event", async (req, res) => {
  console.log("Received Event:", req.body.type);
  const { data, type } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentByPost[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    await Axios.post("http://event-bus-srv:4005/event", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.send({});
});
const port = 4001;

app.listen(port, () => {
  console.log(`App listenning on port ${port}`);
});
