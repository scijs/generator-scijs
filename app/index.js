'use strict'

var yeoman = require('yeoman-generator'),
    mkdirp = require('mkdirp')


var generator = yeoman.generators.Base.extend({


  prompting: function() {
    var done = this.async()
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description'
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Repo',
        default: 'git://github.com/scijs/' + this.appname + '.git'
      },
    ], function(answers) {

      this.name = answers.name
      this.author = answers.author
      this.repo = answers.repo
      this.description = answers.description

      done()
    }.bind(this))

  },

  readme: function() {
    var context = {
      name: this.name,
      author: this.author,
      description: this.description,
      year: 1900 + (new Date).getYear(),
      repo: this.repo
    }

    this.template( '_README.md', 'README.md', context )
  },

  packageJSON: function() {
    var context = {
      name: this.name,
      author: this.author,
      description: this.description,
      year: 1900 + (new Date).getYear(),
      repo: this.repo
    }

    this.template( '_package.json', 'package.json', context )
  },

  mkdirs: function() {
    mkdirp('lib')
    mkdirp('test')
  },

  indexJS: function() {
    this.template( 'lib/_index.js', 'lib/index.js', {} )
  },

  tests: function() {
    this.template( 'test/_test.js', 'test/test.js', {
      name: this.name
    })
  },

  dotfiles: function() {
    this.copy( 'editorconfig', '.editorconfig' )
    this.copy( 'gitignore', '.gitignore' )
    this.copy( 'travis.yml', '.travis.yml' )
    //this.copy( 'jshintrc', '.jshintrc' )
    //this.copy( 'npmignore', '.npmignore' )
  }


})


module.exports = generator
