const connectToMongo = require("./db");
var cors = require("cors");
const http = require("http");
const express = require("express");
const ChatRoute = require("./routes/ChatRoute");
const MessageRoute = require("./routes/MessageRoute");
const multer = require("multer");

//  connectToMongo();
connectToMongo();
const app = express();
const server = http.createServer(app);
const port = 3005;

app.use(cors());
app.use(express.json());
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
