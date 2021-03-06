/**
 * Created by itmnext13 on 2016. 1. 12..
 */
'use strict';

var crypto = require('crypto');

exports.isNotModified = function(req, hash) {
  var etag = req.headers['if-none-match'];
  return etag && (etag === hash);
};

exports.calculateHash = function(contents) {
  return crypto.createHash('md5')
    .update(contents).digest('hex');
};
