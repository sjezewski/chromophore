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

  samplePixel: function(pixel) {
    var min = 500;
    var closestColor = "";
    
    for (var name in palette) {
      color = palette[name];
      var thisDistance = distance(pixel, color);

      if (min > thisDistance) {
        closestColor = name;
        min = thisDistance;
      }
    }
        
    if (this.data[closestColor] === undefined) {
      this.data[closestColor] = 1;
      this.bins++;
    } else {
      this.data[closestColor] += 1;
    }
  
    if (this.max < this.data[closestColor]) {
      this.max = this.data[closestColor];
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

function processImage(img) {
  var entry = img.parentElement;
  var canvas = document.createElement('canvas');
  entry.appendChild(canvas);
  
  var colors  = new NearestColor();
  
  function samplePixel(pixel) {
    return colors.samplePixel(pixel);
  }
  
  var sampler = new Sampler(samplePixel, canvas);
  sampler.sample(img);

  entry.removeChild(canvas);
  
  var graphCanvas = document.createElement('canvas');
  entry.appendChild(graphCanvas);
  var graph   = new BarGraph(400, 200, graphCanvas);

  graph.init();
  graph.draw(colors);

/*
  var stats = document.createElement("p");
  stats.innerText += "N : " + colors.

  entry.appendChild(stats);
*/  
}

function generateNearestColorHistograms() {
  var imgs     = document.body.querySelectorAll("img");
  
  for (var i=0; i<imgs.length; i++) {
    processImage(imgs[i]);
  }


}
