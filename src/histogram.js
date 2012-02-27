function Histogram() {
  this.histogram = {};
}

Histogram.prototype = {

  addPoint: function(value) {

    if (this.histogram[value] === undefined) {
      this.histogram[value] = 1;
    } else {
      this.histogram[value] += 1;
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
    channelHistogram = histrograms[channel];
    channelHistogram.addPoint(pixel[channelIndex]);
    channelIndex++;
  }
  
}

var img = document.body.querySelector("img");
var sampler = new Sampler(samplePixel);
sampler.sample(img);

var graph = new Graph();

graph.init();
graph.draw(histograms['red']);