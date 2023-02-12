const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
module.exports = router;
// im able to use destructuring to get my genre model/key
const { Genre } = require("../db");
// GET /genre
// respond w HTML text to be rendered by the browser to
// show a form
router.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head> <title> Add a new Genre! </title> </head>
            <body>
                <h1> Add new genre </h1> 
                <form method="POST" action="/genre">
                    <div>
                        <label> Name: </label>
                        <input type = "text" name="theName" />
                        <button type="submit"> Add Genre </button>
                    </div>
            </body>
        </html>
    `);
})

// POST /genre
// will create a new genre
router.post("/", async (req, res, next) => {
    // when i get a post request, i'll create a new route in my
    // database
    try {
        // sequelize creates a new genre in the table genre here!
        await Genre.create({ name: req.body.theName })
        // theName comes from the name of the form on line 20ish
        // i redirect to the /genre page below
        res.redirect("/genre")
    } catch (e) {
        next(e);
    }

});

