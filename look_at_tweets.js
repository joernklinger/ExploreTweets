// Get modules
var express = require('express');
var app = express();
var jf = require('jsonfile');
var util = require('util');
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Load processed Tweets
var file = 'ironic_for_node.json';
var Ironic = {};
Ironic = jf.readFileSync(file);

var file2 = 'sincere_for_node.json';
var Sincere = {};
Sincere = jf.readFileSync(file2);

var file3 = 'other_for_node.json';
var Other = {};
Other = jf.readFileSync(file3);


app.get('/ironic', function(req, res) {
    res.render('show', {
        Tweets: Ironic
        });
});

app.get('/sincere', function(req, res) {
    res.render('show', {
        Tweets: Sincere
        });
});

app.get('/other', function(req, res) {
    res.render('show', {
        Tweets: Other
        });
});

var server = app.listen(app.get('port'), function() {
    console.log('Express started on locahost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});
