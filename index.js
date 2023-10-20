const connectToMongo = require("./db");
var cors = require("cors");
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const auth = require("./routes/auth");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");
const multer = require("multer");

connectToMongo();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

let activeUsers = [];

const port = 3005;

app.use(cors());
app.use(express.json());

// Routes
// app.use(express.static(path.resolve("./public")));
// app.get("/", (req, res) => {
//   res.sendFile("/public/index.html");
// });
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
// app.use("/upload", UploadRoute);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("body", req.body);
  console.log("file",req.file);
});

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
