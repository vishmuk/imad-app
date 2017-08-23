var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user:'vishmuk48',
    database:'vishmuk48',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool= new Pool(config);
app.get('/test-db',function (req, res) {
    //Make a select request
    //return a response with the results
  pool.query('SELECT * FROM test', function(err,result) {
      if (err) {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
});
});

var counter=0;
app.get('/counter', function (req, res)
{
counter=counter+1;
res.send(counter.toString());
});
var names=[];

app.get('/submit-name', function (req, res)
{
// URL:/submit-name?name=xxxxx
// Get the name from the request
var name= req.query.name; //ToDO
names.push(name);
//JSON:JavaScript Object Notation

res.send(JSON.stringify(names)); //ToDo

});



app.get('/articles/:articleName', function (req, res)
{
// articleName==article-one
// articles[articleName]= { }content object of article-one


pool.query("SELECT * FROM article WHERE title= *.req.params.articleName,function(err,result){
    
    if(err){
    res.status(500).send (err.toString());
    } else {
        if (result.rows.length===0) {
        res.status(404).send('Article Not Found'); 
        } else {
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
    }

    });

});

//res.send(createTemplate(articleData));

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

//app.get('/ui/madi.png', function (req, res) {
  //res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
//});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
