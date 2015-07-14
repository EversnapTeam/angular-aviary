module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      build: {
        files: {
          'angular-aviary.min.js': ['angular-aviary.js']
        }
      }
    },
    jshint: {
      src: ['angular-aviary.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['uglify', 'jshint']);
};
