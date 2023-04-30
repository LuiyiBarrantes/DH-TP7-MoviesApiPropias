//const db = require('../../database/models');
const { getAllActors, getOneActor, getRecomendedActor } = require('../../services/actorsServices');
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
            return res.status(500).json({
                msg: error.message
            })
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
            return res.status(500).json({
                msg: error.message
            })
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
            return res.status(500).json({
                msg: error.message
            })
        }
    },

    store : async (req, res) => {


    },

    update : async (req, res) =>{

    },

    destroy : async (req, res) =>{

    }

}

module.exports = actorsController;