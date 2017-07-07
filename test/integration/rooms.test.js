'use strict';

var app      = require('../../app');
var Bluebird = require('bluebird');
var expect   = require('expect.js');
var request  = require('supertest');

describe('displaying rooms', function () {
  before(function () {
      return require('../../models').sequelize.sync();
  });
  
  beforeEach(function () {
    this.models = require('../../models');

    return Bluebird.all([
      this.models.Room.destroy({ truncate: true })
    ]);
  });

  it('loads correctly', function (done) {
    request(app).get('/').expect(200, done);
  });

it('updates room status', function (done) {
    this.models.Room.update({ calendar: 1 },{where: {roomname1: 'Mercury-Red-4S'}}).bind(this).then(function (result) {
       }).then(function () {
      request(app).get('/postman').expect(200, done);
    });
  });

});

