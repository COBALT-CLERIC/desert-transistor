var expect = require('chai');
var controller = require('../../server/controller.js');
var helper = require('../../server/helpers.js');
var model = require('../../server/model.js');
var routes = require('../../server/routes.js');

describe('helpers', function(){
  it('should contain an addVote and getVotes method', function(){
    expect(helper.addVote).to.be.a('function');
    expect(helper.getVotes).to.be.a('function');
  });
});

describe('controller', function(){
  it('should contain an addVote and getVotes method', function(){
    expect(controller.addVote).to.be.a('function');
    expect(controller.getVotes).to.be.a('function');
  });
});

describe('model', function(){
  it('should have template of a new schema', function(){
    var data = "string";
    expect(model.create(data)).to.be.a('object');
  });
});

describe('routes', function(){
  it('should make get and post requests', function(){

  });
});

