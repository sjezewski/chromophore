function Sampler(callback) {
  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);  
  this.callback = callback;
}

Sampler.prototype = {
  sample: function(img) {
    var width = img.offsetWidth;
    var height = img.offsetHeight;
    
    this.context.drawImage(img, 0, 0, width, height);
    var pixels = context.getImageData(0,0,width,height).data;
    

    for (var i = 0, n = pixels.length; i < n; i += 4) {
      var thisPixel = [
        pixels[i],
        pixels[i+1],
        pixels[i+2]
      ];
      
      this.callback.call(this, thisPixel);
    } 
    
  }
  
}
