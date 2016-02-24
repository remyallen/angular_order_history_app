var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/sql_joins';
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/customer', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM customers ORDER BY id ASC;');

        query.on('row', function(row) {
            results.push(row);
        });
        query.on('end', function() {
            client.end();
            return res.json(results);
        });
        if(err) {
            console.log(err);
        }
    });
});

app.get('/customerorders/:id', function(req, res) {
    var results = [];
    var customerID = req.params.id;
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT orders.order_date, orders.total FROM orders JOIN addresses ' +
            'ON orders.address_id = addresses.id JOIN customers ON addresses.customer_id = customers.id ' +
            'WHERE customers.id = $1',
            [customerID]);

        query.on('row', function(row){
            results.push(row);
        });
        query.on('end', function() {
            client.end();
            return res.json(results);
        });
        if(err) {
            console.log(err);
        }
    });
});


// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});