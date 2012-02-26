function Histogram() {
  this.histogram = {};
}

Histogram.prototype = {
  getCallback: function(obj) {
    return (function() {
      return obj.addPoint;
    })(this)
  },

  addPoint: function(key, value) {

    if this.histogram[key] === undefined {
      this.histogram[key] = 1;
    } else {
      this.histogram[key] += 1;
    }
    
  }
  
}