const assert = require('cucumber-assert');
const { World } = require('../support/world.js');

module.exports = function runStep() {
  'use strict';

  let emailData;
  const sentimentScores = [];
  const thisWorld = new World();

  this.Given('that Jeremy has written the following emails in Gmail:', (emailTestData, done) => {
    emailData = emailTestData.raw();

    done();
  });

  this.When('Jeremy tries to send the emails in Gmail', (done) => {
    emailData.forEach((individualEmail) => {
      const sentimentScore = thisWorld.sentimentAnalyser(individualEmail[0]);

      sentimentScores.push(sentimentScore);
    });

    done();
  });

  this.Then('SleepOnIt should give the following sentiment scores:', (expectedScores, done) => {
    let allTestsPass = true;

    expectedScores.raw().forEach((expectedScoreString, index) => {
      const actualScore = sentimentScores[index].score;
      const expectedScore = parseInt(expectedScoreString[0], 10);

      if (actualScore !== expectedScore) {
        // eslint-disable-next-line no-console
        console.log(`Expected ${actualScore} to equal ${expectedScore}`);
        allTestsPass = false;
      }
    });

    assert.equal(allTestsPass, true, done);

    done();
  });
};
