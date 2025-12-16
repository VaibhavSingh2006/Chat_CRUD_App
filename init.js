const mongoose = require("mongoose");
const Chat = require("./models/chats.js");
main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChat = [
  {
    from: "Aman",
    to: "Rohit",
    msg: "Hey, how are you?",
    created_at: new Date("2025-12-10T10:15:00")
  },
  {
    from: "Neha",
    to: "Vaibhav",
    msg: "Did you complete the assignment?",
    created_at: new Date("2025-12-10T11:00:00")
  },
  {
    from: "Vaibhav",
    to: "Singh",
    msg: "Send me photo",
    created_at: new Date("2025-12-10T11:30:00")
  },
  {
    from: "Riya",
    to: "Aman",
    msg: "Let's meet in the evening.",
    created_at: new Date("2025-12-10T12:10:00")
  },
  {
    from: "Karan",
    to: "Neha",
    msg: "Project is almost done.",
    created_at: new Date("2025-12-10T13:45:00")
  },
  {
    from: "Singh",
    to: "Vaibhav",
    msg: "Sure, sending now.",
    created_at: new Date("2025-12-10T14:00:00")
  },
  {
    from: "Pooja",
    to: "Karan",
    msg: "Can you review my code?",
    created_at: new Date("2025-12-10T15:20:00")
  },
  {
    from: "Rohit",
    to: "Pooja",
    msg: "Yes, give me 10 minutes.",
    created_at: new Date("2025-12-10T15:35:00")
  },
  {
    from: "Aman",
    to: "Vaibhav",
    msg: "Are you joining the call?",
    created_at: new Date("2025-12-10T16:10:00")
  },
  {
    from: "Vaibhav",
    to: "Neha",
    msg: "Yes, joining now.",
    created_at: new Date("2025-12-10T16:12:00")
  }
];

Chat.insertMany(allChat);