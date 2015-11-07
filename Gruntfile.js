'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/js/{,*/}*.js',
      ]
    },
    express: {
      dev: {
        options:{
          port: 3000,
          hostname: 'localhost',
          server: 'server.js',
          bases: 'src',
          livereload: true
        }
      },
      dist: {
        options:{
          port: 3000,
          hostname: 'localhost',
          server: 'server.js',
          bases: 'dist',  
        }
      }
    },
    watch: {
      livereload: {
        files: [
          'src/*.html',
          'src/css/*.css',
          'src/js/{,*/}*.js',
          'src/img/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        options: {
          livereload: true
        }
      },
    },
    clean: {
      dist: ['dist/*']
    },
    bowerRequirejs: {
      all: {
        options:{
          baseUrl: 'src/js',
        },
        rjsConfig: 'src/js/config.js'
      }
    },
    requirejs: {
      dist: {
        options: {
          mainConfigFile: "src/js/config.js",
          appDir: 'src',
          baseUrl: 'js',
          dir: 'dist',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
        }
      }
    },
  });

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'bowerRequirejs',
    'requirejs',
    'express:dist',
    'express-keepalive'
  ]);

  grunt.registerTask('serve', [
    'jshint',
    'bowerRequirejs',
    'express:dev',
    'watch:livereload'
  ]);

 

};
