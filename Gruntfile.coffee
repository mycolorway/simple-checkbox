module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      styles:
        options:
          bundleExec: true
          style: 'expanded'
          loadPath: '/usr/bin/sass'
          sourcemap: 'none'
        files:
          'styles/checkbox.css': 'styles/checkbox.scss'

    coffee:
      src:
        options:
          bare: true
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

    umd:
      all:
        src: 'lib/checkbox.js'
        template: 'umd.hbs'
        amdModuleId: 'simple-checkbox'
        objectToExport: 'checkbox'
        globalAlias: 'checkbox'
        deps:
          'default': ['$', 'SimpleModule']
          amd: ['jquery', 'simple-module']
          cjs: ['jquery', 'simple-module']
          global:
            items: ['jQuery', 'SimpleModule']
            prefix: ''

    jasmine:
      terminal:
        src: ['lib/checkbox.js']
        options:
          specs: 'spec/checkbox-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
          ]
      test:
        src: ['lib/checkbox.js']
        options:
          outfile: 'spec/index.html'
          styles: 'styles/checkbox.css'
          specs: 'spec/checkbox-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['sass', 'coffee', 'umd', 'jasmine:test:build', 'watch']
  grunt.registerTask 'test', ['sass', 'coffee', 'jasmine:terminal']
