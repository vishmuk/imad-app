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
var bujtton = document.getElementById("counter");
counter = 0;

button.onclick = function(){
  //make a request to the counter end point
  
  //capture the response and store it in a variable
  
  //render the variable in a correct span
  counter = counter + 1;
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
  
  
};