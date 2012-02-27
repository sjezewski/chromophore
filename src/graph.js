(function(){
//    "white" : "#FFFFFF",
  palette = {
    "red" : "#FF0000",
    "green" : "#00FF00",
    "blue" : "#0000FF",
    "yellow" : "#FFFF00",
    "purple" : "#FF00FF",
    "teal" : "#00FFFF"
  }

function transformCoordinates(x,y) {
  return [x+10,410-y];
}

function Graph() {
  this.data     = null;
  this.canvas   = document.createElement('canvas');
  this.canvas.setAttribute('width', '420');
  this.canvas.setAttribute('height', '420');  
  this.context  = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);  
  this.type     = null;
}

Graph.prototype = {
  init: function() {
        
    this.context.beginPath();
    this.context.strokeStyle = "#000000";
    this.context.moveTo(10,410);
    this.context.lineTo(410,410);
    this.context.moveTo(10,10);
    this.context.lineTo(10,410);    
    this.context.closePath();
    this.context.stroke();

/*
    this.context.strokeStyle = "#FF0000";
    this.context.beginPath();
    this.context.moveTo(50,50);
    this.context.lineTo(110,110);    
    this.context.closePath();
    this.context.stroke();    
*/    
  },
  
  clear: function() {
    this.canvas.clear();
    this.init();
  },
  
  draw: function(histogram, yscale) {      
    var firstPoint = true;
    console.log(histogram);
    var total = histogram.bins;
    console.log("Total bins: " + total)

    this.context.strokeStyle = palette['red']; // TODO : Make a copy first
    this.context.beginPath();

    var data = histogram.data;

    var count = 0;
    for (var bin in data) {
      var value = data[bin];        
      var x = (count / total)*400;
      console.log("key/value:", bin, value);
//      var y = value / histogram.max; // Later scale to whatever the plot height is
      var y = yscale(value);
//      var y = yscale(value)/yscale(histogram.max);

      console.log("Raw x/y:",x,y);

      var plotCoordinates = transformCoordinates(x,y);

      if (firstPoint) {
        //this.context.moveTo(transformCoordinates(x,y));
        console.log("Starting point:", plotCoordinates);
        this.context.moveTo(plotCoordinates[0], plotCoordinates[1]);
        firstPoint = false;
      } else {
        console.log("Plotting point:", plotCoordinates);          
        this.context.lineTo(plotCoordinates[0], plotCoordinates[1]);          
      }

      count++;
    }

    console.log("Plotted " + count + " points");
    this.context.closePath();
    this.context.stroke();
  }
  
}

window.Graph = Graph;

}())