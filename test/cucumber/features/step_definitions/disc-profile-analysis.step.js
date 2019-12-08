import assert from 'cucumber-assert';

const { World } = require('../support/world.js');

module.exports = function runStep() {
  let actualDISCProfileResults = [];
  const thisWorld = new World();
  let emailData;

  this.Given('that $name has written the following emails:', (name, emailTestData, done) => {
    emailData = emailTestData.raw();
    done();
  });

  this.When('$name tries to send the emails', (name, done) => {
    actualDISCProfileResults = [];

    emailData.forEach((individualEmail) => {
      const discProfile = thisWorld.discProfileAnalyser.analyseEmail(individualEmail[0]);

      actualDISCProfileResults.push(discProfile);
    });

    done();
  });

  this.Then('SleepOnIt should give the following DISC results:', (expectedProfiles, done) => {
    let allTestsPass = true;

    expectedProfiles.raw().forEach((expectedProfileString, index) => {
      const actualProfile = actualDISCProfileResults[index];
      const expectedProfileObject = JSON.parse(expectedProfileString);

      if (actualProfile.D !== expectedProfileObject.D
          || actualProfile.I !== expectedProfileObject.I
          || actualProfile.S !== expectedProfileObject.S
          || actualProfile.C !== expectedProfileObject.C) {
        // eslint-disable-next-line no-console
        console.error(`Expected ${JSON.stringify(expectedProfileObject)} but got ${JSON.stringify(actualProfile)}`);
        allTestsPass = false;
      }
    });

    assert.equal(allTestsPass, true, done);

    done();
  });
};
