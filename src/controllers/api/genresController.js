const db = require('../../database/models');
const createResponseError = require('../../helpers/createResponseError');
const { getAllGenres, getOneGenre, createGenre } = require('../../services/genresServices');
const {validationRresult} = require('express-validator')
const sequelize = db.sequelize;


const genresController = {
    'list': async (req, res) => {

        try {
            const genres = await getAllGenres();

            return res.status(200).json({
                ok : true,
                meta : {
                    status: 200,
                    total: genres.length,
                    url : "/api/genres"
                },
                data : genres /* puede ir genres directamente */
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }
        
    },
    'detail':async (req, res) => {

        try {

            const {id} = req.params;

            const genre= await getOneGenre(id);

            return res.status(200).json({
                ok : true,
                meta :{
                    status: 200,
                    total: 1,
                    url : `/api/genres/${id}`
                },
                data : genre
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }     
    },

    store : async (req, res) => {

        
        try {

            const errors = validationRresult(req);

            if (!errors.isEmpty()) throw{
                status : 400,
                message : errors.mapped()
            }
            
            const newGenre = await createGenre(req.body)

            return res.status(200).json({
                ok : true,
                meta :{
                    status: 200,
                    total: 1,
                    url : `/api/genres/${newGenre.id}`
                },
                data : newGenre
            })
        } catch (error) {
            return createResponseError(res,error)
        }

    },

    update : async (req, res) =>{
        try {

            const errors = validationRresult(req);

            if (!errors.isEmpty()) throw{
                status : 400,
                message : errors.mapped()
            }

            const newGenre = await updateGenre(req.body)

            return res.status(200).json({
                ok : true,
                meta :{
                    status: 200,
                    total: 1,
                    url : `/api/genres/${newGenre.id}`
                },
                data : genre
            })
        } catch (error) {
            return createResponseError(res,error)
        }
    },

    destroy : async (req, res) =>{

    }

}

module.exports = genresController;