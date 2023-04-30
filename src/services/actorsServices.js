const db = require('../database/models');

module.exports = {

    getAllActors : async (req) => {
        try {
            const actors = db.Actor.findAndCountAll({
                include: [
                    {
                        association: "favorite_movie",
                      attributes: ["title"],
                    },
                    {
                      association: "movies",
                      attributes: ["title"],
                      through: { attributes: [] }
                    },
                    
                  ],
                  attributes: {
                    exclude: ["favorite_movie_id","created_at", "updated_at"],            
                  },
                order: [
                    ['last_name','ASC']
                ]
            })

            return actors/*{count, rows}  */
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }
    },

    getOneGenre : async (id) => {

        try {
            const genre= await db.Genre.findByPk(id);
            return genre
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }

    },
    createGenre : async (data) => {

        try {
            const newGenre = db.Genre.create({
                ...data
            });
            return newGenre
        } catch (error) {
            throw {
                status : 500,
                message : error.message
            }
        }

    },
    
}