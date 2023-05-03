const db = require('../database/models');

module.exports = {

    getAllActors: async (req) => {
        try {
            const actors = db.Actor.findAndCountAll({
                include: [
                    //incluyo la pelicula favorita del actor, solo muestro el titulo
                    {
                        association: "favorite_movie",
                        attributes: ["title"],
                    },
                    {
                        //incluyo las peliculas en las que trabajo, sin los atributos de la tabla pivot
                        association: "movies",
                        attributes: ["title"],
                        through: { attributes: [] }
                    },

                ],
                attributes: {
                    //excluyo los atributos que no necesito mostrar del actor
                    exclude: ["favorite_movie_id", "created_at", "updated_at"],
                },
                order: [
                    ['last_name', 'ASC']
                ]
            })

            return actors
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }
    },

    getOneActor: async (req, id) => {

        try {
            const actor = await db.Actor.findByPk(id, {
                include: [
                    //incluyo la pelicula favorita del actor, solo muestro el titulo
                    {
                        association: "favorite_movie",
                        attributes: ["title"],
                    },
                    {
                        //incluyo las peliculas en las que trabajo, sin los atributos de la tabla pivot
                        association: "movies",
                        attributes: ["title"],
                        through: { attributes: [] }
                    }],
                attributes: {
                    //excluyo los atributos que no necesito mostrar del actor
                    exclude: ["favorite_movie_id", "created_at", "updated_at"],
                },
            });
            return actor
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    getRecomendedActor: async (req) => {

        try {
            const recomendedActor = await db.Actor.findAndCountAll({
                include: [
                    //incluyo la pelicula favorita del actor, solo muestro el titulo
                    {
                        association: "favorite_movie",
                        attributes: ["title"],
                    },
                    {
                        //incluyo las peliculas en las que trabajo, sin los atributos de la tabla pivot
                        association: "movies",
                        attributes: ["title"],
                        through: { attributes: [] }
                    },

                ],
                attributes: {
                    //excluyo los atributos que no necesito mostrar del actor
                    exclude: ["favorite_movie_id", "created_at", "updated_at"],
                },
                where: {
                    rating: { [db.Sequelize.Op.gte]: 8 }
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            return recomendedActor
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    createActor: async (data) => {

        try {
            const newActor = db.Actor.create({
                ...data
            });
            return newActor
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    updateActor: async (data, id) => {

        try {
            const updatedActor = await db.Actor.update({
                ...data
            }, {
                where: { id }
            });
            return updatedActor
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },
    deleteActor: async (id) => {

        try {
            const deletedActor = await db.Actor.destroy({
                where: {
                    id: id
                },
                // force: true es para asegurar que se ejecute la acción
                force: true
            });
            return deletedActor
        } catch (error) {
            throw {
                status: 500,
                message: error.message
            }
        }

    },

}