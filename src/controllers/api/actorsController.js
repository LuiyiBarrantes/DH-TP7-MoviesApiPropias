const db = require('../../database/models');
const sequelize = db.sequelize;


const actorsController = {
    'list': async (req, res) => {

        try {
            const actors = await db.Actor.findAll();

            return res.status(200).json({
                ok : true,
                meta : {
                    status: 200,
                    total: actors.length,
                    url : "/api/actors"
                },
                data : actors /* puede ir actors directamente */
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

            const actor= await db.actor.findByPk(id);

            return res.status(200).json({
                ok : true,
                meta :{
                    status: 200,
                    total: 1,
                    url : `/api/actors/${id}`
                },
                data : actor
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