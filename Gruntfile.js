'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      target: ['*.js']
    }
  });

  grunt.registerTask('test', [
    'eslint'
  ]);

  grunt.registerTask('default', ['test']);
};
