const { escapeXML } = require("ejs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodeOverride = require("method-override");


app.set("viewa", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodeOverride("_method"))

main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
//Index Rout
app.get("/chats", async (req, res)=>{
   let chats = await Chat.find();
   console.log(chats);
   res.render("index.ejs", {chats});
});
// New chat rout
app.get("/chats/new", (req, res) =>{
   res.render("new.ejs");
});
//Create rout to post msg
app.post("/chats", (req, res)=>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save().then(res=>{console.log("chat was saved");}).catch(err=>{console.log(err);});
    res.redirect("/chats");
});
//Edit Route
app.get("/chats/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});
//Update Route
app.put("/chats/:id", async(req, res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});

    console.log(updatedChat);
    res.redirect("/chats");
});
//delete route
app.delete("/chats/:id", async(req, res)=>{
   let {id} = req.params;
   let deletedChat = await Chat.findByIdAndDelete(id);
   console.log(deletedChat);
   res.redirect("/chats");
});

app.get("/", (req, res)=>{
    res.send("Working");
})
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
