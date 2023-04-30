const db = require('../database/models');

module.exports = {

    getAllMovies : async (req) => {
        try {
            const movies = await db.Movie.findAndCountAll({
                include: [
                    {
                        association: "genre",
                        attributes:  ["name"] /*
                        */
                      },
                    {
                      association: "actors",
                       attributes:  ["first_name","last_name","rating",],
                      through: { attributes: [] }
                      /**/
                    },
                    
  
                  ],
                attributes: {
                    exclude: ["genre_id", "created_at", "updated_at","actors.actor_movie"],            
                  },
                order: [
                    ['title','ASC']
                ]
            });

            return movies
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