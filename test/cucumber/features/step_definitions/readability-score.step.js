
module.exports = function () {

  'use strict';

  var assert = require('cucumber-assert'),
      World = require("../support/world.js").World,
      thisWorld = new World(),
      readabilityScores = [],
      emailData;

  this.Given('that a sender has written the following emails with varying vocab levels:', function (emailTestData, done) {
      emailData = emailTestData.raw();

      done();
  });

  this.When('the sender sends the emails', function (done) {

    emailData.forEach(function (individualEmail) {
      let readabilityScore = thisWorld.readabilityAnalyser.calculateReadabilityScore(individualEmail[0]);

      readabilityScores.push(readabilityScore);
    });

    done();
  });

  this.Then('SleepOnIt should give the following readability scores:', function (expectedScores, done) {
    let allTestsPass = true;

    expectedScores.raw().forEach(function (expectedScoreString, index) {
      let actualScore = readabilityScores[index],
          expectedScore = expectedScoreString;

      if (actualScore != expectedScore) {
        console.log('Expected ' + expectedScore + ' to equal ' + actualScore);
        allTestsPass = false;
      }

    });

    assert.equal(allTestsPass, true, done);

    done();
  });

};