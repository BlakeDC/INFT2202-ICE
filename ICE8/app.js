const express = require('express');
var exphbs = require('express-handlebars');

// port
const PORT = 3000;

// initialize  method
const app = express();

// setup template engine
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// express app.use()
app.use((req, res, next) => {
    console.log(`URL: ${req.url}`);
    req.myName = 'Blake';
    next();
})

// make the index route
app.get('/', (req, res) => {
    const titleText = 'Home for INFT2202 Node101 with HandleBars'
    res.render('home', {
        title: titleText
    })
})

// add the about route
app.get('/about', (req, res) => {
    res.render('about', {
        aboutTitle: 'This is my about page!'
    });
})

app.listen(PORT, () => {
    console.log(`Server sterted on port ${PORT}`);
})
