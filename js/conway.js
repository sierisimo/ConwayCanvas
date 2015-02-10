//Ugly, Sier doesn't like globals
var width = 600, height = width, total = 6;//Simple values for all svg, change it if you want bigger or smaller svg

document.addEventListener('DOMContentLoaded',function(){
  var btn = document.getElementById('play'),
    svg = d3.select("#container").append("svg")
      .attr("width",width).attr("height",height),
    dataset = (function(){
      //Change the 10 for the number of elements you want in the game.
      var r = [], t = width%total, p = height%total,
        tw = (width-t)/total, th = (height-p)/total;

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

  //Change states and classes bassed on if the element survives or not
  rects.on("cicleCompleted",function(){
    //Change classes and status
  });

});

var conway = {
  Square: function(a,b,c){
    this.alive = false;
    this.survive = false;
    this.__defineGetter__("x",function(){return a;});
    this.__defineGetter__("y",function(){return b;});
    this.__defineGetter__("l",function(){return c});
  },
  judgeEvent: new CustomEvent("cicleCompleted",{
    bubles:false,
    cancelable: false
  }),
  play: function(rects){
    rects.each(function(d){
      var nTopL = d.x > 0 ?
                    d.y > 0 ?
                      d3.select('rect[x="'+(d.x-d.l)+'"][y="'+(d.y-d.l)+'"]')
                    :false
                  :false,
        nTop = d.y > 0 ? d3.select('rect[x="'+d.x+'"][y="'+(d.y-d.l)+'"]') :false,
        nTopR = (d.x+d.l) < width ?
                  d.y > 0 ?
                    d3.select('rect[x="'+(d.x+d.l)+'"][y="'+(d.y-d.l)+'"]')
                  :false
                :false,
        nLeft = d.x > 0 ? d3.select('rect[x="'+(d.x-d.l)+'"][y="'+d.y+'"]') :false,
        nRight = (d.x+d.l) < width ? d3.select('rect[x="'+(d.x+d.l)+'"][y="'+d.y+'"]') :false
        nDownL = d.x > 0 ?
                  (d.y+d.l) < height ?
                    d3.select('rect[x="'+(d.x-d.l)+'"][y="'+(d.y+d.l)+'"]')
                  :false
                :false,
        nDown = (d.y+d.l) < height ? d3.select('rect[x="'+d.x+'"][y="'+(d.y+d.l)+'"]') :false,
        nDownR = (d.x+d.l) < width ?
                    (d.y+d.l) < height ?
                      d3.select('rect[x="'+(d.x+d.l)+'"][y="'+(d.y+d.l)+'"]')
                    :false
                  :false;

     console.log('rect[x="'+d.x+'"], rect[y="'+d.y+'"]',
       nTopL && nTopL.attr && nTopL.attr("class"),
       nTop && nTop.attr && nTop.attr("class"),
       nTopR && nTopR.attr && nTopR.attr("class"),
       nLeft && nLeft.attr && nLeft.attr("class"),
       nRight && nRight.attr && nRight.attr("class"),
       nDownL && nDownL.attr && nDownL.attr("class"),
       nDown && nDown.attr && nDown.attr("class"),
       nDownR && nDownR.attr && nDownR.attr("class"));
      
      //this.dispatchEvent(conway.judgeEvent);
    });
  }
};
