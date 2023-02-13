const Sequelize = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/moviewatchlist");

const test = async () => {
  try {
    await db.authenticate();
    console.log("Authentication worked!");
  } catch (e) {
    console.error(e);
  }
};
test();

/*
    Movie model
        - title (not null)
        - imdbLink (null)
        - watched (not null, boolean, default false) 
        - maybe upload a photo later
    Genre model
        - name (not null)

    Many-to-many relationship b/t movies and genres
    (need a pivot table)
*/
const Movie = db.define("movie", {
  title: {
    type: Sequelize.STRING(255), // allows a max of 255 chars
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imdbLink: {
    type: Sequelize.STRING(1000),
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  watched: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

const Genre = db.define("genre", {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

const movies_genres = db.define('movies_genres', {
  MovieId: {
    type: Sequelize.INTEGER,
    references: {
      model: Movie,
      key: 'id'
    }
  },
  ActorId: {
    type: Sequelize.INTEGER,
    references: {
      model: Genre,
      key: 'id'
    }
  }
})

Movie.belongsToMany(Genre, { through: "movies_genres" }); //setGenres
Genre.belongsToMany(Movie, { through: "movies_genres" });

module.exports = {
  db,
  Movie,
  Genre,
};
