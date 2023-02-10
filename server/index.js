const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello There!");
});



const PORT = 8080;
app.listen(8080, () => {
    console.log(`Server is running on port ${PORT}`)
});