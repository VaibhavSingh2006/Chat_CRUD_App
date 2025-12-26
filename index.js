const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.redirect("/chats");
});

app.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  res.render("index", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new");
});

app.post("/chats", async (req, res) => {
  const { from, to, msg } = req.body;
  await Chat.create({ from, to, msg, created_at: new Date() });
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.render("edit", { chat });
});

app.put("/chats/:id", async (req, res) => {
  await Chat.findByIdAndUpdate(req.params.id, { msg: req.body.msg });
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id);
  res.redirect("/chats");
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
