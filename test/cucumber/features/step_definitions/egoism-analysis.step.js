const assert = require('cucumber-assert');
const { World } = require('../support/world.js');

module.exports = function runStep() {
  'use strict';

  const thisWorld = new World();
  const egoismScores = [];
  let emailData;

  this.Given('that a sender has written the following emails with varying egoism levels:', (emailTestData, done) => {
    emailData = emailTestData.raw();

    done();
  });

  this.When('the sender sends the emails with varying egoism levels', (done) => {
    emailData.forEach((individualEmail) => {
      const egoismScore = thisWorld.egoismAnalyser(individualEmail[0]);

      egoismScores.push(egoismScore);
    });

    done();
  });

  this.Then('SleepOnIt should give the following egoism scores:', (expectedScores, done) => {
    let allTestsPass = true;

    expectedScores.raw().forEach((expectedScore, index) => {
      const actualScore = egoismScores[index];
      const expectedScoreObject = JSON.parse(expectedScore);

      if (actualScore.selfish !== expectedScoreObject.selfish
          || actualScore.controlling !== expectedScoreObject.controlling
          || actualScore.conforming !== expectedScoreObject.conforming) {
        // eslint-disable-next-line no-console
        console.log(`Expected ${JSON.stringify(expectedScoreObject)
        } to equal ${JSON.stringify(actualScore)}`);

        allTestsPass = false;
      }
    });

    assert.equal(allTestsPass, true, done);

    done();
  });
};
