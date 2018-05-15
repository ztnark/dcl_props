// var webshot = require('webshot');

// var options = {
//   renderDelay: 5000,
//   phantomConfig: { 'ignore-ssl-errors': 'true' }
// };

// webshot('http://35.232.67.126:9292/', 'test3.png', options, function (err) {
//   console.log(err)
// });

// // // http://api.screenshotlayer.com/api/capture?access_key=dcaa9c09382928a7c2c284573ab1d12b&url=http://35.232.67.126:3000/42/47/detail&delay=5&width=800&height=400&viewport=800x800

// // const fs = require('fs');
// // const screenshot = require('screenshot-stream');

// // const stream = screenshot('http://35.232.67.126:3000/43/46/detail', '1024x768', { crop: true, delay: 10 });

// // stream.pipe(fs.createWriteStream('google.com-1024x78.png'))

// var page = require('webpage').create();
// page.open('http://naughty-bassi-d528ee.netlify.com/', function () {
//   window.setTimeout(function () {
//     page.render('github.png');
//     phantom.exit();
//   }, 5000); // Change timeout as required to allow sufficient time 
// });

// page.onError = function (msg, trace) {

//   var msgStack = ['ERROR: ' + msg];

//   if (trace && trace.length) {
//     msgStack.push('TRACE:');
//     trace.forEach(function (t) {
//       msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
//     });
//   }

//   console.error(msgStack.join('\n'));
// }

// page.onInitialized = function () {
//   if (page.injectJs('core.js')) {
//     console.log("Polyfills loaded");
//   }
// }

const API_KEY = 'eca074da-7fa8-4cdc-b17a-b7949e16a72e';

var ScreenshotApi = require('screenshotapi');
var PNGCrop = require('png-crop');
var Twitter = require('./twitter');



function getScreenshot(x,y){
  var captureRequest = {
    url: 'http://35.232.67.126:3000/' + x + '/'+ y + '/detail',
    webdriver: 'chrome',
    viewport: '800x600',
    fullpage: false,
    javascript: true,
    waitSeconds: 3,
  };
  ScreenshotApi.getScreenshot(
    API_KEY,        // your api key
    captureRequest, // the site to capture and your settings
    './'            // local path to store the screenshot png
  )
    .then((localFile) => {
      var config1 = { width: 800, height: 400, top: 92, left: 0 };
      // pass a path, a buffer or a stream as the input
      PNGCrop.crop(localFile, 'img/' + x + 'x' + y + '.png', config1, function (err) {
        if (err) throw err;
        if (x === 150 && y === 150){
          return
        }else if(x <= 150){
          x++
          getScreenshot(x,y)
        }else{
          x = -150
          y++
          getScreenshot(x,y)
        }
        console.log('done!');
      });
      console.log(`Downloaded to ${localFile}`);
    })
    .catch((err) => {
      console.error('Error capturing screenshot:', err);
    });
}

var twitter = new Twitter()
twitter.init()
getScreenshot(-150,-150)