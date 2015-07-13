module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'adobe-creative-ng.js',
        dest: 'adobe-creative-ng.min.js'
      }
    },
    jshint: {
      src: ['adobe-creative-ng.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['uglify', 'jshint']);
};
