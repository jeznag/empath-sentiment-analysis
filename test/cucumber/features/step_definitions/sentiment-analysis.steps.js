
module.exports = function () {

  'use strict';

  var emailData,
      sentimentScores = [],
      assert = require('cucumber-assert'),
      World = require("../support/world.js").World,
      thisWorld = new World();

  this.Given('that Jeremy has written the following emails in Gmail:', function (emailTestData, done) {
      emailData = emailTestData.raw();

      done();
  });

  this.When('Jeremy tries to send the emails in Gmail', function (done) {

    emailData.forEach(function (individualEmail) {
      let sentimentScore = thisWorld.sentimentAnalyser(individualEmail[0]);

      sentimentScores.push(sentimentScore)
    });

    done();
  });

  this.Then('SleepOnIt should give the following sentiment scores:', function (expectedScores, done) {
    let allTestsPass = true;

    expectedScores.raw().forEach(function (expectedScoreString, index) {
      let actualScore = sentimentScores[index].score,
          expectedScore = parseInt(expectedScoreString[0]);

      if (actualScore !== expectedScore) {
        console.log('Expected ' + actualScore + ' to equal ' + expectedScore);
        allTestsPass = false;
      }

    });

    assert.equal(allTestsPass, true, done);

    done();
  });

};