const express = require("express");
const app = express();
const PORT = 8080;
const { db } = require("./db")

let bodyParser = require('body-parser');



const startServer = async () => {
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}
startServer();

// matches any url for a GET request to a possible file
// in the public directory.
// if it finds the file... it'll send that file.
app.use(express.static(__dirname + "/public"))

// start of all middleware
// these two lines make it so req.body works!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// the above makes it so req.body will work
const genresRouter = require("./routes/genre");
const moviesRouter = require("./routes/movie");
app.use("/movies", moviesRouter);
// the line below makes it so it's genre
// any request method to any row that starts w /genre
// will go into this genresRouter
app.use("/genre", genresRouter);
app.get("/", (req, res) => {
    res.send("Hello There!");
});




