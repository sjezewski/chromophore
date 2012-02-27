// TODO ... inherit from graph

(function(){
  
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

function BarGraph(width, height, canvas) {
  this.data     = null;
  var existingCanvas = false;
  if (canvas === null) {
    this.canvas   = document.createElement('canvas');
  } else {
    existingCanvas = true;
    this.canvas = canvas;
  }
  this.width = width;
  this.height = height;
  this.padding = {
    'x' : 10,
    'y' : 40
  };
  this.canvas.setAttribute('width', String(this.width + 2*this.padding.x));
  this.canvas.setAttribute('height', String(this.height + 2*this.padding.y));  
  
  this.context  = this.canvas.getContext('2d');
  
  if (!existingCanvas) {
    document.body.appendChild(this.canvas);      
  }
  
  
  
  this.type     = null;
  this.availableColors = [
    'blue',
    'teal',
    'green',
    'purple',
    'red',
    'black',
    'yellow',
    'white'
    ];
  this.palette = {
    "red" : "#FF0000",
    "green" : "#00FF00",
    "blue" : "#0000FF",
    "yellow" : "#FFFF00",
    "purple" : "#FF00FF",
    "teal" : "#00FFFF",
    "white" : "#DDDDDD",
    "black" : "#000000"
  }
  
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

    var width = this.width/histogram.bins;  
    var x = [
              this.transformX(n * width + width*0.1),
              this.transformX(n * width + width*0.9)
            ];
          
    var height = histogram.data[key]/histogram.max*this.height;
    var top = this.transformY(height);
    
    //var thisColor = this.availableColors.pop();     
    //this.context.fillStyle = this.palette[thisColor];
    this.context.fillStyle = "#DD00DD";
    
    this.context.fillRect(x[0], top, width*0.8, height);
    this.context.fillStyle = "#000000";    
    this.context.fillText(key, n * width + width*0.5, this.transformY(0) + 20, width);
  },
  
  draw: function(histogram) {
    var start = new Date();
    var data = histogram.data;

    var count = 0;
    for (var bin in data) {
      this.draw_bar(count, bin, histogram);
      count++;
    }

    var finish = new Date();
    console.log(start, finish);
    console.log("Time to draw:" + elapsedMilliseconds(start, finish) );    
    
  }
  
}

window.BarGraph = BarGraph;

}())