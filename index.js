const express = require("express");
const urlRoute = require("./routes/url");
const {connectToMongoDB} = require("./connection");

const app = express();
const PORT = 8002;

connectToMongoDB('mongodb://127.0.0.1:27017/url-8')
.then(() => console.log("mongodb connected"));

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, (req, res) => console.log(`Server started on the port: ${PORT}`));