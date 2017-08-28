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
var button = document.getElementById("counter");
//counter = 0;

button.onclick = function(){
  //create a request object to the counter end point
  var request = new XMLHttpRequest();
  
  
  //capture the response and store it in a variable
  request.onreadystatechange = function(){
      if (request.readystate=== XMLHttpRequest.DONE) {
      //take an action
      if(request.status==200){
          var counter = request.responseText;
          var span = document.getElementById("count");
          span.innerHTML = counter.toString();
  
          }
  }
  //not done yet
  
  };
  
  
  //render the variable in a correct span
 // counter = counter + 1;
  //Make the request
  request.open("GET", "http://vishmuk48.imad.hasura-app.io/counter", true);
  request.send(null);
  
};