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
    this.context.stroke();
  },
  
  clear: function() {
    this.canvas.clear();
    this.init();
  },
  
  draw: function(data) {
    if (data.length === undefined) {
      // Data is a hash
      this.type = "hash";
      
      if (this.data !== null) {
        // Worry about overplotting later
      }
      
      var firstPoint = true;
      var total = data.length;
      
      var count = 0;
      for (var bin in data) {
        var value = data[bin];        
        var x = count / total;
        var y = value / 400; // Later scale to whatever the plot height is
        
        if (firstPoint) {
          this.context.moveTo(transformCoordinates(x,y));
          firstPoint = false;
        } else {
          this.context.lineTo(transformCoordinates(x,y));          
        }
        
        count++;
        
      }
      this.context.stroke();
      
    } else {
      // Data is an array
      this.type = "array";
      
      console.log("Array not supported yet");
    }
  }
  
}

window.Graph = Graph;

}())