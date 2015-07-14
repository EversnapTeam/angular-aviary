module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n\t<%= pkg.name %> v<%= pkg.version %>\n' +
         '\t(c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> \n' +
         '\tLicense: <%= pkg.license %> \n*/\n'
      },
      build: {
        options: {
          sourceMap: true
        },
        files: {
          'angular-aviary.min.js': ['angular-aviary.js']
        }
      }
    },
    karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
    jshint: {
      src: ['angular-aviary.js', 'tests.js']
    }
  });

  grunt.registerTask('test', ['jshint','karma']);
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['uglify', 'jshint']);
};
