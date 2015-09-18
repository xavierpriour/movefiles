'use strict';

var shell = require('shelljs');
var fs = require('fs');

exports.run = function(src, dst) {
  // strip trailing / if any
  src = src.replace(/\/+$/, '');
  dst = dst.replace(/\/+$/, '');

  // check dst is valid, create if if missing
  if(fs.existsSync(dst)) {
    if(!fs.statSync(dst).isDirectory()) {
      throw 'The specified destination (' + dst + ') is a file, it must be a directory';
    }
  } else {
    fs.mkdirSync(dst);
  }

  var files = shell.ls('-R', src);
  files.forEach(function(path) {
    var fSrc = src + '/' + path;
    var fDst = dst + '/' + path;
    // is it a file or a dir?
    if (fs.statSync(fSrc).isDirectory()) {
      if (fs.existsSync(fDst)) {
        if(!fs.statSync(fDst).isDirectory()) {
          shell.rm(fDst);
          fs.mkdirSync(fDst);
        }
      } else {
        fs.mkdirSync(fDst);
      }
    } else {
      console.log(fSrc + ' > ' + fDst);
      fs.renameSync(fSrc, fDst);
    }
  });
};
