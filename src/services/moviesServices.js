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

    getOneGenre: async (id) => {

        try {
            const genre = await db.Genre.findByPk(id);
            return genre
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    createGenre: async (data) => {

        try {
            const newGenre = db.Genre.create({
                ...data
            });
            return newGenre
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },

}