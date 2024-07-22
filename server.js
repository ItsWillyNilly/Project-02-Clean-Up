const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const {initializePassport} = require('./config/passport');
const flash = require('express-flash');
const methodOverride = require('method-override');

const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// handlebars
app.engine('handlebars', exphbs(
    { defaultLayout: 'main' }
));
app.set('view engine', 'handlebars');

// express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static directory
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// routes
require('./routes/user-api-routes.js')(app);
require('/routes/item-api-routes.js')(app);
require('/routes/pages-routes.js')(app);

// syncing our sequelize models and then starting our express app
sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});