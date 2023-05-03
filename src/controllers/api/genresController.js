const createResponseError = require('../../helpers/createResponseError');
const { getAllGenres, getOneGenre, createGenre, updateGenre, deleteGenre } = require('../../services/genresServices');
const { validationResult } = require('express-validator')

const genresController = {
    'list': async (req, res) => {

        try {
            const { count: total, rows: genres } = await getAllGenres(req);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/api/genres"
                },
                genres /* puede ir genres directamente */
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }

    },
    'detail': async (req, res) => {

        try {

            const { id } = req.params;

            const genre = await getOneGenre(req, id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/genres/${id}`
                },
                data: genre
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    },

    'store': async (req, res) => {

        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const newGenre = await createGenre(req.body)

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Genero creado exitosamente",
                    url: `/api/genres/${newGenre.id}`
                },
                data: newGenre
            })
        } catch (error) {
            return createResponseError(res, error)
        }

    },

    'update': async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            let { id } = req.params;
            const genre = await updateGenre(req.body, id)
            const updatedGenre = await getOneGenre(req, id)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Genero actualizado exitosamente",
                    url: `/api/genres/${newGenre.id}`
                },
                updatedGenre
            })
        } catch (error) {
            return createResponseError(res, error)
        }
    },

    'destroy': async (req, res) => {
        try {
            let { id } = req.params;
            const genre = await deleteGenre(id)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    message: "Genre eliminado exitosamente",
                    url: "/api/genres"
                },
                genre
            })
        } catch (error) {
            console.log(error);
            return createResponseError(res, error)
        }
    }

}

module.exports = genresController;