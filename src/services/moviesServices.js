const db = require('../database/models');

module.exports = {

    getAllMovies: async (req) => {
        try {
            const movies = await db.Movie.findAndCountAll({
                include: [
                    {
                        //inclyo el genero de la pelicula, solo mestro el nombre
                        association: "genre",
                        attributes: ["name"]
                    },
                    {
                        //incluyo los actores de la pelicula, solo muestro nombre y apellido (quise ver si podia concatenar el nombre y apellido pero no supe como), sin los atributos de la tabla pivot
                        association: "actors",
                        attributes: ["first_name", "last_name"],
                        through: { attributes: [] }

                    },


                ],
                attributes: {
                    exclude: ["genre_id", "created_at", "updated_at"],
                },
                order: [
                    ['title', 'ASC']
                ]
            });

            return movies
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getOneMovie: async (req, id) => {

        try {
            const movie = await db.Movie.findByPk(id,
                {
                    include: [{
                        association: "genre",
                        attributes: ["name"]
                    },
                    {
                        //incluyo los actores de la pelicula, solo muestro nombre y apellido (quise ver si podia concatenar el nombre y apellido pero no supe como), sin los atributos de la tabla pivot
                        association: "actors",
                        attributes: ["first_name", "last_name"],
                        through: { attributes: [] }
                    }],
                    attributes: {
                        exclude: ["genre_id", "created_at", "updated_at"],
                    }
                });
            return movie
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    getNewestMovies: async (req) => {

        try {
            const newestMovies = db.Movie.findAndCountAll({
                include: [
                    {
                        //inclyo el genero de la pelicula, solo mestro el nombre
                        association: "genre",
                        attributes: ["name"]
                    },
                    {
                        //incluyo los actores de la pelicula, solo muestro nombre y apellido (quise ver si podia concatenar el nombre y apellido pero no supe como), sin los atributos de la tabla pivot
                        association: "actors",
                        attributes: ["first_name", "last_name"],
                        through: { attributes: [] }

                    },


                ],
                attributes: {
                    exclude: ["genre_id", "created_at", "updated_at"],
                },order: [
                    ['release_date', 'DESC']
                ],
                limit: 5
            })
            return newestMovies
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    createMovie: async (data) => {

        try {
            const newMovie = db.Movie.create({
                ...data
            });
            return newMovie
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },

}