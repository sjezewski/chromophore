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
  },
  
  // Guess the subject color
  guess: function(outputElem) {
    // First sort by descending frequencuy
    var order = [];
    var usedBins = {};
    // Naive sort, but w 8 bins, I don't care
    while(order.length < this.bins) {
      var maxValue = null;
      var maxBin = null;
      
      for(var bin in this.data) {
        if (!usedBins[bin]) {
          if (maxValue === null) {
            maxValue = this.data[bin];
            maxBin = bin;
            continue;
          }

          if (maxValue < this.data[bin]) {
            maxValue = this.data[bin];
            maxBin = bin;            
          }

        }

      }
      
      order.push(maxBin);
      usedBins[maxBin] = true;
      
    }
    
    // Sorted. Now use the bins
    console.log("Frequency Order:", order);
    
    // My manual classifier:
    // -- Use the weighted average of the components, omitting the first two
    
    var guess = [0,0,0];
    
    // Normalize the total count by removing the top two bins' counts
    var total = this.points - this.data[order[0]] - this.data[order[1]];
        
    for(var j = 2; j < order.length; j++) {
      var binName = order[j];
      console.log("cumulative guess:" + JSON.stringify(guess))
      console.log("Adding " + binName + "'s component:");
      var frequency = this.data[binName];
      console.log("Freq:" + frequency + ", Point:" + JSON.stringify(palette[binName]));
      var component = vectorTimesScalar(palette[binName], frequency/total);
      guess = vectorAdd(guess, component);
    }
    
    console.log("Result:", guess);
    
    var canvas = document.createElement('canvas');
    outputElem.appendChild(canvas);
    canvas.setAttribute('width', "60");
    canvas.setAttribute('height', "60");  
    canvas.className = "guess";
    var context  = canvas.getContext('2d');
    context.fillStyle = rgbToHex(guess);    
    console.log("Guess hex:", rgbToHex(guess))
    context.fillRect(0,0, 60,60);    
    
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

  colors.guess(entry);

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
