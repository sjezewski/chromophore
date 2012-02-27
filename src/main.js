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

function processImage() {
console.log("processing");

var img = document.body.querySelector("img");
var sampler = new Sampler(samplePixel);
sampler.sample(img);

var graph = new Graph();

graph.init();
graph.draw(histograms['blue'], function(y){return Math.log(y)} );

var p = document.createElement("p");
document.body.appendChild(p);
histograms['blue'].output(p);

}

window.addEventListener('load', processImage, false);