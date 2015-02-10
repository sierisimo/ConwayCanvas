document.addEventListener('DOMContentLoaded',function(){
  var width = 600, height = width,
    svg = d3.select("#container").append("svg")
      .attr("width",width).attr("height",height),
    dataset = (function(){
      var r = [], t = width%10, p = height%10,
        tw = (width-t)/10, th = (height-p)/10;

      for(var i = 0; i < width-t; i+=tw){
        for(var j = 0; j < height-p; j+=th)
          r.push(new figClass.Square(i,j));
      }
      return r;
    })(),
    rects = svg.selectAll("rect")
      .data(dataset).enter().append("rect");
    /*
    circles = svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle");

  circles.attr('cx',function(d, i) {
            return (i * 50) + 25;
        })
       .attr("cy", height/2)
       .attr("r", function(d) {
            return d;
       });
     */
     console.log(rects);
});


var figClass = {
  Square: function(x,y){
    this.alive = false;
    this.x = x;
    this.y = y;
  }
};
