palette = {
  "black" : [0,0,0],
  "white" : [255,255,255],
  "red" : [255, 0, 0],
  "green" : [0, 255, 0],
  "blue" : [0, 0, 255],
  "yellow" : [255, 255, 0],
  "purple" : [255, 0, 255],
  "teal" : [0, 255, 255]
}

function NearestColor() {
  this.data = {};
  this.bins = 0;
  this.points = 0;
  this.max = 0;
}

NearestColor.prototype = {

  addPoint: function(value) {
    
    
    
    if (this.data[value] === undefined) {
      this.data[value] = 1;
      this.bins++;
    } else {
      this.data[value] += 1;
    }
  
    if (this.max < this.data[value]) {
      this.max = this.data[value];
    }
  
    this.points++;      
  },
  
  output: function(elem) {
    for(var bin in this.data) {
      var value = this.data[bin];
      elem.innerText += bin + "\t" + value + "\n"; 
    }
  }
  
}
