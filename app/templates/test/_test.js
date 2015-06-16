'use strict'

var assert = require('chai').assert,
    sampleFunction = require('../lib')


describe( "<%= name %>", function() {

  beforeEach(function() {
  })

  afterEach(function() {
  })

  it("the sample function adds two numbers",function() {
    assert( sampleFunction(2,3) === 5 )
  })

})
