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
  this.availableColors = ['yellow','teal','purple','green','blue','red'];
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

  },
  
  clear: function() {
    this.canvas.clear();
    this.init();
  },
  
  draw: function(histogram, yscale) {      
    var start = new Date();

    var firstPoint = true;
    console.log(histogram);
    var total = histogram.bins; 
       
    var thisColor = this.availableColors.pop();
    this.context.strokeStyle = palette[thisColor]; // TODO : Make a copy first
    this.context.beginPath();

    var data = histogram.data;

    var count = 0;
    for (var bin in data) {
      var value = data[bin];        
      var x = (count / total)*400;

      var y = value;
//      var y = yscale(value)/yscale(histogram.max);

      var plotCoordinates = transformCoordinates(x,y);

      if (firstPoint && count == 0) {
        count++;
        continue
      }

      if (firstPoint) {
        this.context.moveTo(plotCoordinates[0], plotCoordinates[1]);
        firstPoint = false;
      } else {
        this.context.lineTo(plotCoordinates[0], plotCoordinates[1]);          
      }

      count++;
    }

    this.context.stroke();
    this.context.closePath();    
    var finish = new Date();
    console.log(start, finish);
    console.log("Time to draw:" + elapsedMilliseconds(start, finish) );    
    
  }
  
}

window.Graph = Graph;

}())