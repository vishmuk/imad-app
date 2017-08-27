console.log('Loaded!');

//change the text of the div
var element =  document.getElementById("main-text");

element.innerHTML= "new value tested";

//move the image on click
var img = document.getElementById("green");
img.onclick = function ()
{
    img.style.marginleft='100px';
};