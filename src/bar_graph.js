// TODO ... inherit from graph

(function(){
  
  palette = {
    "red" : "#FF0000",
    "green" : "#00FF00",
    "blue" : "#0000FF",
    "yellow" : "#FFFF00",
    "purple" : "#FF00FF",
    "teal" : "#00FFFF",
    "white" : "#FFFFFF",
    "black" : "#000000"
  }

function max(data) {
  var max = null;
  
  for (var key in data) {
    var value = data[key];
    if (max === null || max < value) {
      max = value
    }
  }
  
  return max;
}

function BarGraph() {
  this.data     = null;
  this.canvas   = document.createElement('canvas');
  this.width = 400;
  this.height = 400;
  this.padding = {
    'x' : 10,
    'y' : 40
  };
  this.canvas.setAttribute('width', String(this.width + 2*this.padding.x));
  this.canvas.setAttribute('height', String(this.height + 2*this.padding.y));  
  this.context  = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);  
  this.type     = null;
  this.availableColors = ['yellow','teal','purple','green','blue','red'];
}

BarGraph.prototype = {
  init: function() {
        
    this.context.beginPath();
    this.context.strokeStyle = "#000000";
    this.context.moveTo(this.padding.x,this.height + this.padding.y);
    this.context.lineTo(this.width + this.padding.x,this.height + this.padding.y);
    this.context.moveTo(this.padding.x,this.padding.y);
    this.context.lineTo(this.padding.x,this.height + this.padding.y);
    this.context.closePath();
    this.context.stroke();

  },
  
  clear: function() {
    this.canvas.clear();
    this.init();
  },
  
  transformCoordinates: function(x,y) {
    return [this.transformX(x),this.transformY(y)];
  },

  transformX: function(x) {
    return x+this.padding.x;
  },

  transformY: function(y) {
    return this.height+this.padding.y-y;  
  }, 
  
  draw_bar: function(n, key, histogram) {
    console.log("drawing " + n + "th bar (" + key + ")");

    var width = this.width/histogram.bins;  
    var x = [
              this.transformX(n * width + width*0.1),
              this.transformX(n * width + width*0.9)
            ];
          
    var height = histogram.data[key]/histogram.max*this.height;
    var top = this.transformY(height);
    
    console.log("width:", width, "x:", x, "top:", top);
    
    var thisColor = this.availableColors.pop();     
    this.context.fillStyle = palette[thisColor];
    console.log("fill color:", thisColor);
    
    this.context.fillRect(x[0], top, width*0.8, height);
  },
  
  draw: function(histogram) {      
    var start = new Date();

    var firstPoint = true;
    console.log(histogram);
    var total = histogram.bins; 
       
//    this.context.strokeStyle = palette[thisColor]; // TODO : Make a copy first
//    this.context.beginPath();

    var data = histogram.data;

    var count = 0;
    for (var bin in data) {
      this.draw_bar(count, bin, histogram);
      count++;
    }

//    this.context.stroke();
//    this.context.closePath();    
    var finish = new Date();
    console.log(start, finish);
    console.log("Time to draw:" + elapsedMilliseconds(start, finish) );    
    
  }
  
}

window.BarGraph = BarGraph;

}())