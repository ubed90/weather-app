const path = require("path");
const express = require("express");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Configure partials
const hbs = require("hbs");

const app = express();
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicDirectoryPath = path.join(__dirname, "../public");

// Templating engine
app.set('view engine', 'hbs');

// Configuring custom views path
app.set('views', viewsPath);


// Set Partials Directory
hbs.registerPartials(partialsPath);

//  If serving static files use this
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name: 'Ubed Shaikh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ubed Shaikh'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ubed Shaikh',
        message: 'For any Support contact shaikhobaid123@gmail.com'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an Address!!" 
        })
    }

    const address = req.query.address;
    // let [actualLocation , forecastData] = [];
    // let error;

    // geocode(address, (geocodeError, { latitude, longitude, location } = {}) => {
    //     if(geocodeError) {
    //         error = geocodeError;
    //     } else {
    //         forecast(latitude, longitude, location, (forecastError, data, place_name) => {
    //             if(forecastError) {
    //                 error = forecastError
    //             } else {
    //                 actualLocation = place_name
    //                 forecastData = data
    //             }
    //         })
    //     }
    // })

    // if(error) {
    //     return res.send({
    //         error
    //     })
    // }

    geocode(address, (geocodeError, { latitude, longitude, location } = {}) => {
        if(geocodeError) return res.send({error: geocodeError});

        forecast(latitude, longitude, location, (forecastError, forecastData, place_name, icon) => {
            if(forecastError) return res.send({ error: forecastError });

            res.send({
                forecast: forecastData,
                location: place_name,
                address,
                icon
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Ubed Shaikh',
        error: 'Help Article Not Found'
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Ubed Shaikh',
        error: 'Page Not Found'
    });
})

// If not serving Static files use this

// app.get("", (req, res) => {
//   res.send("Hello Express!!");
// });

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
