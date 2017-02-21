var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('winedb', server);

db.open(function(err, db) {
if(!err) {
console.log("Connected to 'winedb' database");
db.collection('wines', {strict:true}, function(err, collection) {
if (err) {
console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
populateDB();
}
});
}
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', function(err, collection) {
        // collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
         collection.findOne({'_id':new mongo.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
db.collection('wines', function(err, collection) {

collection.find().toArray(function(err, items) {
res.send(items);
});
});
};

// /--------------------------------------------------------------------------------------------------------------------/
// // Populate database with sample data -- Only used once: the first time the application is started.
// // You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

var wines = [
{
    userid: "1",
    name: "Swapnil",
    mobile: "88888888888",
    skill: "Android",
    experience: "5",
    projects: "Some projects",
    tools: "Android tools , SDK,GIt",
    portfolio: "www.google.com"
},
{
    userid: "2",
    name: "aditya",
    mobile: "9898989877",
    skill: "Android",
    experience: "7",
    projects: "Some projects",
    tools: "Android tools , SDK,GIt",
    portfolio: "www.google.com"
}];

db.collection('wines', function(err, collection) {
    collection.insert(wines, {safe:true}, function(err, result) {});
});
};