//const db = require('../../database/models');
const { validationResult } = require('express-validator');
const createResponseError = require('../../helpers/createResponseError');
const { getAllActors, getOneActor, getRecomendedActor, createActor, updateActor, deleteActor } = require('../../services/actorsServices');
//const sequelize = db.sequelize;


const actorsController = {
    'list': async (req, res) => {

        try {
            const /*actors  */ {count:total , rows : actors} = await getAllActors(req);

            return res.status(200).json({
                ok : true,
                meta : {
                    status: 200,
                    total: total,/*  */
                    url : "/api/actors"
                },
                actors /* puede ir actors directamente */
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }
        
    },
    'detail':async (req, res) => {

        try {

            const {id} = req.params;

            const actor= await getOneActor(req,id);

            return res.status(200).json({
                ok : true,
                meta :{
                    status: 200,
                    total: 1,
                    url : `/api/actors/${id}`
                },
                actor
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }     
    },

    'recomended': async (req, res) => {

        try {

            const {count:total, rows/* :actorsRecommended */} = await getRecomendedActor()
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/api/actors/recommended"
                },
                data: rows/* actorsRecommended */
            })

        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }
    },

    store : async (req, res) => {
        
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            
            const actor = await createActor(req.body)
            
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Actor creado exitosamente",
                    url: "/api/actors/create"
                },
                actor
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }

    },

    update : async (req, res) =>{
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) throw{
                status : 400,
                message : errors.mapped()
            }
            let {id} = req.params;
        const actor = await updateActor(req.body,id)
        const updatedActor = await getOneActor(req, id)
        return res.status(200).json({
            ok: true,
            meta: {
                status: 200,
                total: 1,
                message: "Actor actualizado exitosamente",
                url: "/api/actors"
            },
            /* movie, */
            updatedActor
        })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }
    },

    destroy : async (req, res) =>{
        try {
            let {id} = req.params;
            const actor = deleteActor(id)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Actor eliminado exitosamente",
                    url: "/api/actors"
                },
                actor/* , */                
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res,error)
        }      
    }

}

module.exports = actorsController;