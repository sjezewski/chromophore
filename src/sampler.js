function Sampler(callback, canvas) {

  if (canvas === undefined) {
    this.canvas = document.createElement('canvas');     
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);  
  } else {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }
  
  this.callback = callback;
}

Sampler.prototype = {
  sample: function(img) {
    var start = new Date();
    
    var width = img.offsetWidth;
    var height = img.offsetHeight;
    
    this.context.drawImage(img, 0, 0, width, height);
    var pixels = this.context.getImageData(0,0,width,height).data;
    
    pixelCount = 0;
    for (var i = 0, n = pixels.length; i < n; i += 4) {
      var thisPixel = [
        pixels[i],
        pixels[i+1],
        pixels[i+2]
      ];
      
      this.callback.call(this, thisPixel);
      pixelCount += 1;
    } 
   
    var finish = new Date();
    console.log("Sampling took " + elapsedMilliseconds(start, finish) + "ms");
  }
  
}
