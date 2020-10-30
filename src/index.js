const express= require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');


//inicio
const app= express();

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handleabars'),
}));
app.set('view engine', '.hbs');
//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//variables globales
app.use((req, res, next)=>{
    next();
})

//rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/usuario', require('./routes/users'));
app.use('/vehiculo', require('./routes/vehiculo'));
app.use('/empresa', require('./routes/empresa'));
app.use('/taller', require('./routes/taller'));
app.use('/mantenimiento', require('./routes/mantenimiento'));
app.use('/soat', require('./routes/soat'));
app.use('/tecmeca', require('./routes/tecmeca'));
app.use('/todoriesgo', require('./routes/todoriesgo'));
app.use('/repuesto', require('./routes/repuesto'));
app.use('/tipo_empresa', require('./routes/tipo_empresa'));
app.use('/tipo_vehiculo', require('./routes/tipo_vehiculo'));
app.use('/marca', require('./routes/marca'));



//public
app.use(express.static(path.join(__dirname, 'public')));


//inicia el servidor
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});