//TODO: Change this for a function that can be called

document.addEventListener('DOMContentLoaded',function(){
/*
    var canvas = document.getElementById("conway"),
    canHeight = canvas.offsetHeight,
    canWidth = canvas.offsetWidth,
    squares = 10, //TODO: Change this for a variable that could be setted
    ctx = canvas.getContext("2d");

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,140);
    ctx.stroke();

    //for (var i = 0; i < 10; i++){
    //ctx.lineWidth = 1+i;
    //ctx.beginPath();
    //ctx.moveTo(5+i*14,5);
    //ctx.lineTo(5+i*14,140);
    //ctx.stroke();
  //}
    window.ctx = ctx;
*/
  var svg = d3.select("#container").append("svg");
});


var canvasClass = {
  Square: function(){
    this.alive = false;

  }
};
