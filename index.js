'use strict';

var shell = require('shelljs');
var mv = require('mv');
var fs = require('fs');

exports.run = function(src, dst) {
  // strip trailing / if any
  src = src.replace(/\/+$/, '');
  dst = dst.replace(/\/+$/, '');

  // check dst is not a file
  if(fs.existsSync(dst) && !fs.statSync(dst).isDirectory()) {
      throw 'The specified destination (' + dst + ') is a file, it must be a directory';
  }

  var files = shell.ls('-R', src);
  files.forEach(function(path) {
    var fSrc = src + '/' + path;
    var fDst = dst + '/' + path;
    // is it a file or a dir?
    if (fs.statSync(fSrc).isDirectory()) {
      if (fs.existsSync(fDst) && !fs.statSync(fDst).isDirectory()) {
          shell.rm(fDst);
      }
    } else {
      console.log(fSrc + ' > ' + fDst);
        mv(fSrc, fDst, {mkdirp: true}, function(err){
          if(err) {
            console.log('Error trying to move ' + fSrc + ' to ' + fDst);
            console.log(err);
          }
      });
    }
  });
};
