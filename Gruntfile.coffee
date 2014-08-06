module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      checkbox:
        options:
          style: 'expanded'
        files:
          'styles/checkbox.css': 'styles/checkbox.scss'

    coffee:
      checkbox:
        files:
          'lib/checkbox.js': 'src/checkbox.coffee'
      spec:
        files:
          'spec/checkbox-spec.js': 'spec/checkbox-spec.coffee'

    watch:
      styles:
        files: ['styles/*.scss']
        tasks: ['sass']
      scripts:
        files: ['src/*.coffee', 'spec/*.coffee']
        tasks: ['coffee']
      jasmine:
        files: [
          'styles/checkbox.css'
          'lib/checkbox.js'
          'specs/*.js'
        ],
        tasks: 'jasmine:test:build'

    jasmine:
      terminal:
        src: ['lib/checkbox.js']
        options:
          specs: 'spec/checkbox-spec.js'
          vendor: [
            'vendor/bower_components/jquery/dist/jquery.min.js'
            'vendor/bower_components/simple-module/lib/module.js'
          ]
      test:
        src: ['lib/checkbox.js']
        options:
          outfile: 'spec/index.html'
          styles: 'styles/checkbox.css'
          specs: 'spec/checkbox-spec.js'
          vendor: [
            'vendor/bower_components/jquery/dist/jquery.min.js'
            'vendor/bower_components/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['sass', 'coffee', 'jasmine:test:build', 'watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'jasmine:terminal']
