const db = require('../database/models');

module.exports = {

    getAllGenres: async (req) => {
        try {
            const genres = await db.Genre.findAndCountAll({
                include: [
                    {
                        association: "movies",
                        attributes: ["title"],
                    },
                ],
                attributes: {
                    exclude: ["created_at", "updated_at"],
                },
                order: [
                    ['name', 'ASC']
                ]
            });

            return genres
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