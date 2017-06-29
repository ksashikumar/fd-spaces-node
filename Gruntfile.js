module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({
express: {
options:{
	cmd: process.argv[0],
 
      // Will turn into: `node OPT1 OPT2 ... OPTN path/to/server.js ARG1 ARG2 ... ARGN` 
      // (e.g. opts: ['node_modules/coffee-script/bin/coffee'] will correctly parse coffee-script) 
      opts: [ ],
      args: [ ],
 
      // Setting to `false` will effectively just run `node path/to/server.js` 
      background: true,
 
      // Called when the spawned server throws errors 
      fallback: function() {},
 
      // Override node env's PORT 
      port: 4000,
 
      // Override node env's NODE_ENV 
      node_env: undefined,
 
      // Enable Node's --harmony flag 
      harmony: false,
 
      // Consider the server to be "running" after an explicit delay (in milliseconds) 
      // (e.g. when server has no initial output) 
      delay: 0,
 
      // Regular expression that matches server output to indicate it is "running" 
      output: ".+",
 
      // Set --debug (true | false | integer from 1024 to 65535, has precedence over breakOnFirstLine) 
      debug: false,
 
      // Set --debug-brk (true | false | integer from 1024 to 65535) 
      breakOnFirstLine: false,
 
      // Object with properties `out` and `err` both will take a path to a log file and 
      // append the output of the server. Make sure the folders exist. 
      logs: undefined
 
},
    dev: {
      options: {
        script: './server.js'
      }
    },
  load: {
	options: {
        script: './calendar.js',
      }    
    }
  },
  watch: {
      express: {
        files: ['./server.js','./calendar.js'],
        tasks: ['express']

      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-express-server');
grunt.loadNpmTasks('grunt-keepalive');

grunt.registerTask('default', ['express','keepalive']);
//grunt.registerTask('dev', ['jshint:dev', 'uglify:dev', 'express:dev','less:dev']);
};
