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