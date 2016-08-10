var express = require('express');
var app = express();

//database tbd
var cors = require("cors");
app.use(cors());

// Parse incoming request bodies under the req.body property
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//hello world
var mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/Products');
var modelSchema = new mongoose.Schema({ name: String, quantity: Number });

var ProductModel = mongoose.model('product', modelSchema);

app.get('/', function(req, res) {
    ProductModel.find(function (err, products) {
        if (err) {
            res.send('Error occured while loading all Products. Please try again.');
        } else {
            res.send(products);
        }
        console.info('Products get executed');
    })
});

app.post('/add', function (req, res) {
    var name = req.body.name;
    var quantity = req.body.quantity;

    var newProduct = new ProductModel({name: name, quantity: quantity});
    newProduct.save( function (err) {
        if (err) {
            console.log('Failed to save new product ' + name);
        } else {
            console.log('Saved new Product with name ' + name);
            res.send();
        }
    });
});


app.listen(3000, function(){
    console.log('App is listening on port 3000 and connects to DB Products');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

