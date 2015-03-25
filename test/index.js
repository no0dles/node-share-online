var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var api = require('../index');

describe('checkLinks', function () {
  var error, content;

  before(function(done) {
    api.checkLinks([
      'http://www.share-online.biz/dl/SBAAJOLNXE3T',
      'http://www.share-online.biz/dl/NF006QLN9QP7']).then(function (cont) {
      content = cont;
    }).fail(function (err) {
      error = err;
    }).done(function () {
      done();
    });
  });

  it('error should not exist', function () { should.not.exist(error); });
  it('content should exist', function () { should.exist(content); });
  it('content should be an array with length 2', function () { content.should.have.length(2); });

  it('first item id should be SBAAJOLNXE3T', function () { assert.equal(content[0].id, 'SBAAJOLNXE3T'); });
  it('first item status should be OK', function () { assert.equal(content[0].status, 'OK'); });
  it('first item name should be Bildschirmfoto 2015-03-22 um 16.46.48.png', function () { assert.equal(content[0].name, 'Bildschirmfoto 2015-03-22 um 16.46.48.png'); });
  it('first item md5 should be b3294342bbfd4235bd7679ffb1126dd8', function () { assert.equal(content[0].md5, 'b3294342bbfd4235bd7679ffb1126dd8'); });

  it('second item id should be NF006QLN9QP7', function () { assert.equal(content[1].id, 'NF006QLN9QP7'); });
  it('second item status should be OK', function () { assert.equal(content[1].status, 'OK'); });
  it('second item name should be car-icon.png', function () { assert.equal(content[1].name, 'car-icon.png'); });
  it('second item md5 should be 0a3e011287d599103e96d64105bd9358', function () { assert.equal(content[1].md5, '0a3e011287d599103e96d64105bd9358'); });
});


describe('getUserDetail', function () {
  var error, content;

  before(function(done) {
    api.getUserDetail().then(function (cont) {
      content = cont;
    }).fail(function (err) {
      error = err;
    }).done(function () {
      done();
    });
  });

  it('error should not exist', function () { should.not.exist(error); });
  it('content should exist', function () { should.exist(content); });

  it('result should contain user', function () { should.exist(content.user); });
  it('result should contain email', function () { should.exist(content.email); });
  it('result should contain group', function () { should.exist(content.group); });
  it('result should contain register_date', function () { should.exist(content.register_date); });
  it('result should contain expire_date', function () { should.exist(content.expire_date); });
  it('result should contain points', function () { should.exist(content.points); });
  it('result should contain money', function () { should.exist(content.money); });
  it('result should contain a', function () { should.exist(content.a); });
});


describe('getDownloadLink', function () {
  var error, content;

  before(function(done) {
    api.getDownloadLink('SBAAJOLNXE3T').then(function (cont) {
      content = cont;
    }).fail(function (err) {
      error = err;
    }).done(function () {
      done();
    });
  });

  it('error should not exist', function () { should.not.exist(error); });
  it('content should exist', function () { should.exist(content); });

  it('result should contain status', function () { should.exist(content.status); });
  it('result should contain url', function () { should.exist(content.url); });
  it('result should contain id', function () { should.exist(content.id); });
  it('result should contain name', function () { should.exist(content.name); });
  it('result should contain size', function () { should.exist(content.size); });
  it('result should contain md5', function () { should.exist(content.md5); });
});