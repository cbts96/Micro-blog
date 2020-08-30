const express = require("express");
const Axios = require("axios");

const app = express();
app.use(express.json());

app.get("/event", async (req, res) => {
  const { data, type } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await Axios.post("http:localhost:4005/event", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({ status: "ok" });
});

const port = 4003;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
