
module.exports = function () {

  'use strict';

  var assert = require('cucumber-assert'),
      World = require("../support/world.js").World,
      thisWorld = new World(),
      egoismScores = [],
      emailData;

  this.Given('that a sender has written the following emails with varying egoism levels:', function (emailTestData, done) {
      emailData = emailTestData.raw();

      done();
  });

  this.When('the sender sends the emails with varying egoism levels', function (done) {

    emailData.forEach(function (individualEmail) {
      let egoismScore = thisWorld.egoismAnalyser.analyseEgoism(individualEmail[0]);

      egoismScores.push(egoismScore);
    });

    done();
  });

  this.Then('SleepOnIt should give the following egoism scores:', function (expectedScores, done) {
    let allTestsPass = true;

    expectedScores.raw().forEach(function (expectedScore, index) {
      let actualScore = egoismScores[index],
          expectedScoreObject = JSON.parse(expectedScore);

      if (actualScore.selfish !== expectedScoreObject.selfish ||
          actualScore.controlling !== expectedScoreObject.controlling || 
          actualScore.conforming !== expectedScoreObject.conforming) {
      
        console.log('Expected ' + JSON.stringify(expectedScoreObject) + 
          ' to equal ' + JSON.stringify(actualScore));

        allTestsPass = false;
      }

    });

    assert.equal(allTestsPass, true, done);

    done();
  });

};