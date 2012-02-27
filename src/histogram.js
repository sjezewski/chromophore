function Histogram() {
  this.data = {};
  this.bins = 0;
  this.points = 0;
  this.max = 0;
}

Histogram.prototype = {

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
