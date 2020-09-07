const express=require("express");
const Axios=require("axios");

const app=express();
app.use(express.json());

app.post("/event",(req,res)=>{
    const event=req.body;

    Axios.post("http://posts-clusterip-srv:4000/event",event);
    Axios.post("http://comments-srv:4001/event",event);
    Axios.post("http://query-srv:4002/event",event);
    Axios.post("http://moderation-srv:4003/event",event);

    res.send({status:"ok"})

})
const port=4005;
app.listen(port,()=>{
    console.log(`App running on port ${port}`);
})
