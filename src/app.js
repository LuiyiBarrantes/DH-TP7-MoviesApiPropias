const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const createError = require('http-errors')

const app = express();


//Ejecuto el llamado a mis rutas
const indexRouter = require('./routes/index');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');

//Aquí pueden colocar las rutas de las APIs
const genresApiRoutes = require('./routes/api/genresRoutes')
const actorsApiRoutes = require('./routes/api/actorsRoutes')
const moviesApiRoutes = require('./routes/api/moviesRoutes')
//const moviesApiRoutes = require('./routes/api/moviesRoutes');
const createResponseError = require('./helpers/createResponseError');


// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json())
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));



app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use('/api',genresApiRoutes);
app.use('/api',moviesApiRoutes);
app.use('/api',actorsApiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404,"no encontrado"));
  });
  
  // error handler
  app.use(function (error, req, res, next) {
    return createResponseError(res,error);
  });

//Activando el servidor desde express
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001 http://localhost:3001'));
