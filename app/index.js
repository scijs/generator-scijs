'use strict'

var yeoman = require('yeoman-generator')


var generator = yeoman.generators.Base.extend({


  readme: function() {
    var context = {
      title: this.moduleName
      author: this.author,
      description: this.description,
      year: 1900 + (new Date).getYear(),
      repo: this.repo
    }

    this.template( '_README.md', 'README.md', context )
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
