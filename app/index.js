'use strict'

var yeoman = require('yeoman-generator'),
    mkdirp = require('mkdirp')



function getContextHash( gen ) {
  return {
    name: gen.name,
    author: gen.author,
    description: gen.description,
    year: 1900 + (new Date).getYear(),
    repo: gen.repo
  }
}

var generator = yeoman.generators.Base.extend({

  init: function() {
    this.appname = this.appname.replace(/\s+/g, '-')
    this.context = getContextHash(this)
  },

  prompting: function() {
    var done = this.async()
    console.log(this.appname)
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
    this.template( '_README.md', 'README.md', this.context )
  },

  packageJSON: function() {
    this.template( '_package.json', 'package.json', this.context )
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
