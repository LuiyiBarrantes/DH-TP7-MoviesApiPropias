const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { getAllMovies, getOneMovie, getNewestMovies } = require('../../services/moviesServices');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': async (req, res) => {

        try {
            const { count: total, rows: movies } = await getAllMovies(req);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/api/movies"
                },
                movies
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: error.message
            })
        }

        /* .then(movies => {
            res.render('moviesList.ejs', {movies})
        }) */
    },
    'detail': async (req, res) => {

        try {

            const { id } = req.params;

            const movie = await getOneMovie(req, id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/movies/${id}`
                },
                data: movie
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: error.message
            })
        }


        /* .then(movie => {
            res.render('moviesDetail.ejs', {movie});
        }); */
    },
    'new': async (req, res) => {

        try {
            const {count:total,rows:moviesNew} = await getNewestMovies(req)
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: total,
                    url: "/movies/new"
                },
                moviesNew
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: error.message
            })
        }


        /* .then(movies => {
            res.render('newestMovies', {movies});
        }); */
    },
    'recomended': async (req, res) => {

        try {

            const moviesRecommended = await db.Movie.findAll({
                include: ['genre'],
                where: {
                    rating: { [db.Sequelize.Op.gte]: 8 }
                },
                order: [
                    ['rating', 'DESC']
                ]
            });
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: moviesRecommended.length,
                    url: "/api/recommended"
                },
                data: moviesRecommended
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: error.message
            })
        }


        /* .then(movies => {
            res.render('recommendedMovies.ejs', {movies});
        }); */
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    /* add: function (req, res) {
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        
        Promise
        .all([promGenres, promActors])
        .then(([allGenres, allActors]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesAdd'), {allGenres,allActors})})
        .catch(error => res.send(error))
    }, */
    create: function (req, res) {
        Movies
            .create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            )
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))
    },
    /* edit: function(req,res) {
        let movieId = req.params.id;
        let promMovies = Movies.findByPk(movieId,{include: ['genre','actors']});
        let promGenres = Genres.findAll();
        let promActors = Actors.findAll();
        Promise
        .all([promMovies, promGenres, promActors])
        .then(([Movie, allGenres, allActors]) => {
            Movie.release_date = moment(Movie.release_date).format('L');
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesEdit'), {Movie,allGenres,allActors})})
        .catch(error => res.send(error))
    }, */
    update: function (req, res) {
        let movieId = req.params.id;
        Movies
            .update(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                },
                {
                    where: { id: movieId }
                })
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))
    },
    /* delete: function (req,res) {
        let movieId = req.params.id;
        Movies
        .findByPk(movieId)
        .then(Movie => {
            return res.render(path.resolve(__dirname, '..', 'views',  'moviesDelete'), {Movie})})
        .catch(error => res.send(error))
    }, */
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies
            .destroy({ where: { id: movieId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/movies')
            })
            .catch(error => res.send(error))
    }
}

module.exports = moviesController;