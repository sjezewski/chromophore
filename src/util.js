function distance(a, b) {
  var sum = 0;

  var thisDist = 0;
  for(var i=0; i<3; i++){
    sum += Math.pow( a[i] - b[i], 2.0);
  }

  return Math.sqrt( sum );
}

function elapsedMilliseconds(t1, t2) {
  return bigMilliseconds(t2) - bigMilliseconds(t1);
}

function bigMilliseconds(t) {
  return t.getSeconds()*1000 + t.getMilliseconds();
}

function vectorTimesScalar(vector, scalar) {
//  console.log("vector:", vector, "scalar:", scalar);
  var length = vector.length;
  var result = [];
  for(;length--;) {
    result[length] = vector[length] * scalar;
  }
//  console.log("result:", result);
  return result;
}

function vectorAdd(a, b) {
  var length = a.length;
  var result = [];
  for(;length--;) {
    result[length] = a[length] + b[length];
  }
  return result;  
}

function rgbToHex(vector) {
  var hexString = "#";

  for (var index in vector) {
    hexString += channelToHex( round(vector[index]) );
  }
  
  return hexString;
}

function channelToHex(num) {
  var big = Math.floor(num/16);
  var small = (num - big*16);
    
  return rangeToHexString(big) + rangeToHexString(small);
}

// 0-15 => 0-F
function rangeToHexString(num) {
  if (num < 10) {
    return String(num)
  }
  
  return String.fromCharCode(65+num-10);
  
}

function round(num) {
  var whole = parseInt(num);
  var remainder = num - whole;
  
  if (remainder >= 0.5) {
    return whole+1;
  } else {
    return whole;
  }
  
}