const assert = require('cucumber-assert');
const { World } = require('../support/world.js');

module.exports = function runStep() {
  'use strict';

  const thisWorld = new World();
  const readabilityScores = [];
  let emailData;

  this.Given('that a sender has written the following emails with varying vocab levels:', (emailTestData, done) => {
    emailData = emailTestData.raw();

    done();
  });

  this.When('the sender sends the emails', (done) => {
    emailData.forEach((individualEmail) => {
      const readabilityScore = thisWorld.readabilityAnalyser(individualEmail[0]);

      readabilityScores.push(readabilityScore);
    });

    done();
  });

  this.Then('SleepOnIt should give the following readability scores:', (expectedScores, done) => {
    let allTestsPass = true;

    expectedScores.raw().forEach((expectedScoreString, index) => {
      const actualScore = readabilityScores[index].toString();
      const expectedScore = expectedScoreString.toString();

      if (actualScore !== expectedScore) {
        // eslint-disable-next-line no-console
        console.log(`Expected ${expectedScore} to equal ${actualScore}`);
        allTestsPass = false;
      }
    });

    assert.equal(allTestsPass, true, done);

    done();
  });
};
