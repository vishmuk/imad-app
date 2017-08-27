console.log('Loaded!');

//change the text of the div
var element =  document.getElementById("main-text");

element.innerHTML= "new value tested";

//move the image on click
var img = document.getElementById("green");

var marginLeft = 0;
function moveRight (){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function ()
{
    var interval = setInterval(moveRight,100);
    //img.style.marginLeft='200px';
    
};