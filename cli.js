#!/usr/bin/env node
'use strict';
var mvf = require('./index.js');

//check argv has right number of arguments
var src = '.';
var dst = null;
switch(process.argv.length) {
  case 3:
    src = '.';
    dst = process.argv[2];
    break;
  case 4:
    src = process.argv[2];
    dst = process.argv[3];
    break;
  default:
    console.log('only accept 1 or 2 args: movefiles <src> dst');
    process.exit();
}

mvf.run(src, dst);
