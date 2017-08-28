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
  
  
  //render the variable in a correct span
 // counter = counter + 1;
  //Make the request
  request.open("GET", "http://vishmuk48.imad.hasura-app.io/counter", true);
  request.send(null);
  
};

//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit=document.getElementById('submit_btn');

submit.onclick = function(){
    //make a request to the server and send the name
    //capture a list of names and render as a list
   var names = ["name1","name2","name3","name4"];
   var list = '';
   for (var i=0; i< names.length;i++){
       list == '<li>'+names[i]+'/li>'; 
   }
  var ul =document.getElementById('namelist');
  ul.innerHTML = list;
    
};
