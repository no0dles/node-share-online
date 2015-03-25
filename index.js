var request = require('request');
var config = require('config');
var form_urlencoded = require('form-urlencoded');
var http = require('http-request');
var Q = require('q');

var exports = module.exports = {};

exports.request = function (options) {
  var deferred = Q.defer();

  request(options, function(error, response, body) {
    if(error) {
      deferred.reject(error);
    } else if(response.statusCode != 200) {
      var e = new Error(body);
      e.code = response.statusCode;
      e.errno = response.statusCode;
      deferred.reject(e);
    } else {
      deferred.resolve(body)
    }
  });

  return deferred.promise;
};

exports.checkLinks = function (links) {
  var options = {
    method: 'POST',
    url: 'http://api.share-online.biz/linkcheck.php?md5=1',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    body: form_urlencoded.encode({
      links: links.join('\r\n')
    })
  };

  return exports.request(options).then(function (body) {
    var result = [];
    var lines = body.split('\n');

    for(var l = 0; l < lines.length; l++) {
      var parts = lines[l].split(';');

      if(parts.length != 5) {
        continue;
      }

      result.push({
        id:parts[0],
        status: parts[1],
        name: parts[2],
        size: parts[3],
        md5: parts[4]
      });
    }
    return result;
  });
};

exports.getUserDetail = function() {
  var options = {
    method: 'GET',
    url: 'http://api.share-online.biz/cgi-bin?q=userdetails&username=' + config.get('Username') + '&password=' + config.get('Password')
  };

  return exports.request(options).then(function (body) {
    var result = {};
    var lines = body.split('\n');

    for(var l = 0; l < lines.length; l++) {
      var parts = lines[l].split('=');

      result[parts[0]] = parts[1].trim();
    }

    return result;
  })
};

exports.getDownloadLink = function(download_id) {
  var options = {
    method: 'GET',
    url: 'http://api.share-online.biz/cgi-bin?q=linkdata&username=' + config.get('Username') + '&password=' + config.get('Password') + '&lid=' + download_id
  };

  return exports.request(options).then(function (body) {
    var result = {};
    var lines = body.split('\n');

    for(var l = 0; l < lines.length; l++) {
      var parts = lines[l].split(/:(.+)?/);

      if(parts.length != 3) {
        continue;
      }

      result[parts[0].toLowerCase()] = parts[1].trim();
    }

    return result;
  });
};


exports.downloadFile = function (download_link, file_name, a, progress) {
  var deferred = Q.defer();

  var options = {
    url: download_link,
    headers: {
      'Cookie': 'a=' + a
    },
    progress: progress
  };

  var cb = function(err, res) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(res);
    }
  };

  http.get(options, file_name, cb);

  return deferred.promise;
};