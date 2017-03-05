var request = require('request');

var compare = function(a, b, cb) {
  var params = {
    "s1": a,
    "s2": b
  }

  var headers = {
    "Ocp-Apim-Subscription-Key": process.env.SIMILARITY_KEY,
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  var options = {
    url: "https://westus.api.cognitive.microsoft.com/academic/v1.0/similarity",
    method: "POST",
    headers: headers,
    form: params
  }

  request(options, function(error, response, body) {
    if (!error) {
      cb(body);
    }
  });
};

module.exports = compare;