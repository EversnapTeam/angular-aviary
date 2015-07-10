module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'aodbe-creative-ng.js',
        dest: 'aodbe-creative-ng.min.js'
      }
    },
    jshint: {
      src: ['aodbe-creative-ng.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['uglify', 'jshint']);
};
