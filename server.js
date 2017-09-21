var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');


var config = {
    user:'vishmuk48',
    database:'vishmuk48',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
   secret: 'someRandomSecretValue',
   cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
    <head>
        <title>
            ${title}
        </title>
        <link href="/ui/style.css"  rel="stylesheet" />
        <meta name='viexport content = width-device-width,initial-scale=1' />
    </head>
    <body>
    <div>
        <a href="/">Home</a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div class="container">
        <div>
            ${date.toDateString()}
        </div>
    <div>
        ${content}
    </div>
    </div>
    <marquee>This is a webpage with function!</marquee>
    </body>
    </html>`;
return htmlTemplate;
}

function hash(input, salt){
    //how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    //return hashed.toString('hex');
    return ["pbkdf2Sync","10000",salt,hashed.toString('hex')].join('$');
    
}
app.get('/hash/:input',function(req,res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user/', function(req,res){
   //username, password and create an entry in the user table
   //{"username":"vishnu", "password":"password"}
   //JSON request
   var username = req.body.username;
   var password = req.body.password;
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user"(username, password) VALUES ($1,$2)',[username,dbString], function(err, result){
       if (err) {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send('User successfully created:' +username);
      }
   });
});

app.post('/login' , function(req,res) {
 var username = req.body.username;
 var password = req.body.password;
   
    pool.query('SELECT * FROM "user" WHERE username = $1',[username], function(err, result){
       if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.send(403).send('username/password is invalid');
          } else {
          // Match the password
          var dbString = result.rows[0].password;
          var salt = dbString.split('$')[2];
          var hashedPassword = hash(password,salt); //creating a hash based on the password submitted and the original salt
          if (hashedPassword === dbString) {
              
              //set the session
              req.session.auth = {userId: result.rows[0].id};
              //set cookie with a session id
              //internally it maps the session id to the object
              //{ auth : {userid}}
              
              
            //res.send('credentials correct!');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse('{"message":"Credential Correct"}'));
          } else {
               res.send(403).send('username/password is invalid');
          }
      }
    }
   });
});
 app.get('/check-login' , function(req,res){
     if(req.session && req.session.auth && req.session.auth.userId) {
         res.send('you are logged in:' + req.session.auth.userId.toString());
     } else {
         res.send('user not logged in');
     }
 })  ;


app.get('/logout', function(req,res){
   delete req.session.auth;
   res.send('Logged out');
});




var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query("SELECT * FROM test",function(err,result) {
      if (err) {
          res.status(500).send(err.toString());
      }
      else
      {
          res.send(JSON.stringify(result.rows));
      }
});
});

    


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req,res){
   counter = counter + 1;
   res.send(counter.toString());
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
var names = [];
app.get('/submit-name', function(req,res){ //URL: /submit-name?name=xxxxx
    //get the name from the request object
    var name=req.query.name;
    names.push(name);
    //JSON: JAvascript object notation
    res.send(JSON.stringify(names));
    
});
app.get('/articles/:articleName',function (req,res){
    //articleName == article-one
    //articles[articleName] == {} content object of article one
    //var articleName = req.params.articleName;
    
    //SELECT * FROM article WHERE title = '\'; DELETE WHERE a= \'asdf'
    pool.query("SELECT * FROM article WHERE title= $1" ,  [req.params.articleName], function(err,result) {
      if (err)   {
                    res.status(500).send(err.toString());
              
                  }else {
                            if(result.rows.length === 0){
                            res.status(404).send("Article Not Found");
                            }else {
                                    var articleData = result.rows[0];
                                    res.send(createTemplate(articleData));
                                   }
                        }
                   });
        
   
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
