module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'adobe-creative-ng.min.js': ['adobe-creative-ng.js']
        }
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
