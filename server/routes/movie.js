const express = require("express");
const router = express.Router();
module.exports = router;
// im able to use destructuring to get my genre model/key
const { Movie, Genre } = require("../db");
// GET /movies/add-movie
// respond w HTML text to be rendered by the browser to
// show a form
router.get("/add-movie", async (req, res) => {
  const allOfMyGenres = await Genre.findAll();
  // this will send views/movie-form.html!
  //res.sendFile(__dirname + "/views/movie-form.html");
  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add a Movie to your watchlist</title>
</head>
<body>
    <h1>Add movie</h1>
    <form method="POST" action="/movies">
        <div>
            <label>Title:</label>
            <input name="title" type="text"/>
        </div>
        <div>
            <label>IMDB link:</label>
            <input name="link" type="text" placeholder="Optional"/>
        </div>
        <div>
            <div id="genre-selects-container">
                <select id="genre-select" name = "genres">
                    <option></option>
                    ${allOfMyGenres
                    .map((genre) => {
                        return `<option value="${genre.id}"> ${genre.name} </option>`;
                    })
                    .join("")}
                </select>
            </div>
            <button type="button" id="add-button"> + </button>
        </div>
        <button type="submit">Add Movie</button>
    </form>

    <script type="text/javascript" src="/movie-form.js"> </script>
</body>
</html>
`);
});

router.get("/", (req, res) => {
  res.send("movie list will display here");
});

// POST /movies
router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const imdbLink = req.body.link;
  const attachedGenreIds = req.body.genres;
  console.log(req.body);
  try {
    console.log(req.body);
    const newMovie = await Movie.create({
      title: title,
      imdbLink: imdbLink || null,
    });
    await newMovie.setGenres(attachedGenreIds);
    res.redirect("/movies");
  } catch (e) {
    next(e);
  }
});
