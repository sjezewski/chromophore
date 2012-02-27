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

var histograms = {
  'red' : new Histogram(),
  'green' : new Histogram(),
  'blue' : new Histogram()
}

function samplePixel(pixel) {
  var channelIndex = 0;

  for (var channel in histograms) {
    channelHistogram = histograms[channel];
    channelHistogram.addPoint(pixel[channelIndex]);
    channelIndex++;
  }
  
}

function generateColorHistograms() {
console.log("processing");

var img = document.body.querySelector("img");
var sampler = new Sampler(samplePixel);
sampler.sample(img);

var graph = new Graph();

graph.init();
graph.draw(histograms['red'], function(y){return Math.log(y)} );
graph.draw(histograms['blue'], function(y){return Math.log(y)} );
graph.draw(histograms['green'], function(y){return Math.log(y)} );

var p = document.createElement("p");
document.body.appendChild(p);
//histograms['blue'].output(p);

}