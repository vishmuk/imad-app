/*console.log('Loaded!');

//change the text of the div
var element =  document.getElementById("main-text");

element.innerHTML= "new value tested";

//move the image on click
var img = document.getElementById("green");

var marginLeft = 0;
function moveRight (){
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function ()
{
    var interval = setInterval(moveRight,50);
    //img.style.marginLeft='200px';
    
};*/
//counter code
/*var button = document.getElementById("counter");
//counter = 0;

button.onclick = function(){
  //create a request object to the counter end point
  var request = new XMLHttpRequest();
  
  
  //capture the response and store it in a variable
  request.onreadystatechange = function(){
      if (request.readyState === XMLHttpRequest.DONE) {
      //take an action
      if(request.status==200){
          var counter = request.responseText;
          var span = document.getElementById("count");
          span.innerHTML = counter.toString();
  
          }
  }
  //not done yet
  
  };
  request.open("GET", "http://vishmuk48.imad.hasura-app.io/counter", true);
  request.send(null);
  
};*/

  //submit username/password to login

var submit=document.getElementById('submit_btn');

submit.onclick = function(){
    var request = new XMLHttpRequest();
  
    //capture the response and store it in a variable
  request.onreadystatechange = function(){
      if (request.readyState === XMLHttpRequest.DONE) {
      //take an action
      
          //make a request to the server and send the name
    //capture a list of names and render as a list
    //console.log('user logged in');
    if(request.status==200){
    alert('Logged in successful');
      } else if(request.status === 403){
          alert('username/password is incorrect');
        } else if (request.status === 500) {
            alert('something went wrong');
            }
      }
  
  
   /*var names = request.responseText;
   names = JSON.parse(names);
   var list = '';
    for (var i=0; i< names.length;i++){
       list += '<li>' + names[i] + '</li>'; 
    }
  var ul =document.getElementById('namelist');
  ul.innerHTML = list;*/
          
  
  //not done yet
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  //var n = nameInput.value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://vishmuk48.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  
};
   
   
    
    


  
  //render the variable in a correct span
 // counter = counter + 1;
  //Make the request
  
