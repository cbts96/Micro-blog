const express = require("express");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const Axios = require("axios");
app.use(express.json());
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/posts/create", async (req, res) => {
  const id = crypto.randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  await Axios.post("http://event-bus-srv:4005/event", {
    type: "PostCreated",
    data: { id, title },
  });
  res.status(201).send(posts[id]);
});
app.post("/event",(req,res)=>{
  console.log("Received Event: ",req.body.type);
  res.send({})
})
const port = 4000;

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
