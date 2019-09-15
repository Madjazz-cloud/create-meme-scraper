var https = require('https');
let data;
var fs = require('fs'),
  giveMe = require('request');

var download = function(uri, filename, callback) {
  //request.head(uri, function(err, res, body) {
  //console.log('content-type:', res.headers['content-type']);
  //console.log('content-length:', res.headers['content-length']);

  giveMe(uri)
    .pipe(fs.createWriteStream(filename))
    .on('close', callback);
  //});
};
var options = {
  host: 'memegen.link',
  path: '/examples'
};
var request = https.request(options, function(res) {
  data = '';
  res.on('data', function(chunk) {
    data += chunk;
  });

  res.on('end', function() {
    //console.log(data);

    filter(data);
  });
});
request.on('error', function(e) {
  console.log(e.message);
});

request.end();

function filter(data) {
  const matchesSelectedStrings = data.match(/ src="\/.+watermark=none"/g);

  const matchesCorrectSelectedStrings = matchesSelectedStrings.map(
    function slice(string) {
      let cutString = string.slice(6, -1);
      return 'https://memegen.link' + cutString;
    }
  );
  // 1.pick one string out of the array
  // 2. slice it
  // 3. give it back to me
  // 4. pick the next one
  // 5. repeat until done with all matchesFiltered
  // map = looping over (in this case over the strings)

  //matchesFiltered.map();
  // console.log(matchesCorrectSelectedStrings);
//   for (let i = 0; i < 10; i++) {
//     console.log(matchesCorrectSelectedStrings[i]);
//     console.log(i);
//   }
  const fs = require('fs');
  const dir = './memes';

  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.error(err);
  }
}

// let UrlString = matchesCorrectSelectedStrings[i];
// download(UrlString, './image.jpg'; function(){
//   console.log('done');


  // let UrlString = matchesCorrectSelectedStrings[i];
  // download(UrlString, './Image.jpg', function() {
  //   console.log('done'))
  // };