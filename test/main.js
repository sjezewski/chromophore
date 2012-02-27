var fs = require('fs');
console.log("Running script");

if (phantom.args.length < 2) {
  console.log("Usage: phantomjs main.js <image> <algorithm>")
  phantom.exit(1);
}

var image = phantom.args[0];
var algorithm = phantom.args[1];

console.log("Image: " + image);
console.log("Algorithm: " + algorithm);

var page = new WebPage;
page.settings['localToRemoteUrlAccessEnabled'] = true;
console.log("Settings:" + JSON.stringify(page.settings));


page.viewportSize = { width: 400, height: 400};
var contents = fs.read("main.html");
console.log("Got contents:\n"+  contents)

page.onLoadStarted = function() {
  console.log("Load started")
}

page.onLoadFinished = function() {
  console.log("Finished load");
  page.render('output.png');
}

page.content = contents;

//page.content = "";
//page.render('output.png');

phantom.exit();