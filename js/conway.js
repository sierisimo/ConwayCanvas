document.addEventListener('DOMContentLoaded',function(){
  var width = 600, height = width, //Simple values for all svg, change it if you want bigger or smaller svg
    btn = document.getElementById('play'),
    svg = d3.select("#container").append("svg")
      .attr("width",width).attr("height",height),
    dataset = (function(){
      //Change the 10 for the number of elements you want in the game.
      var r = [], t = width%10, p = height%10,
        tw = (width-t)/10, th = (height-p)/10;

      // Create the square. That easy
      for(var i = 0; i < width-t; i+=tw){
        for(var j = 0; j < height-p; j+=th){
          //The conway.Square contains the real data, we push it into the array
          // because d3 expects an array of data. for elements
          r.push(new conway.Square(i,j,tw));
        }
      }
      return r;
    })(),
    rects = svg.selectAll("rect")
      .data(dataset).enter().append("rect");

  rects.attr("width",function(d){
    return d.l;
  }).attr("height",function(d){
    return d.l;
  }).attr("x",function(d){
    return d.x;
  }).attr("y",function(d){
    return d.y;
  }).attr("class",function(d){
    //Check conway.css and _svg.scss
    if(d.alive){
      return "alive";
    }
    return "dead";
  });

  //Let the user choose the initial config
  rects.on("click",function(d){
    if(this.classList.contains("dead")){
      this.classList.remove("dead");
      this.classList.add("alive");
      d.alive = true;
    }else{
      this.classList.remove("alive");
      this.classList.add("dead");
      d.alive = false;
    }
  })

  //Prevent the user change the config after started
  btn.addEventListener('click',function(){
    rects.on("click",null);
    conway.play(rects);
  });

});

var conway = {
  Square: function(a,b,c){
    this.alive = false;
    this.__defineGetter__("x",function(){return a;});
    this.__defineGetter__("y",function(){return b;});
    this.__defineGetter__("l",function(){return c});
  },
  play: function(rects){

  }
};
