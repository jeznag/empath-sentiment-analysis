import assert from 'cucumber-assert';
import { World } from '../support/world.js';

module.exports = function () {

  let actualDISCProfileResults = [];
  const thisWorld = new World();
  let emailData;

  this.Given('that $name has written the following emails:', function (name, emailTestData, done) {
      emailData = emailTestData.raw();
      done();
  });

  this.When('$name tries to send the emails', function (name, done) {
    actualDISCProfileResults = [];

    emailData.forEach(function (individualEmail) {
      const discProfile = thisWorld.discProfileAnalyser.analyseEmail(individualEmail[0]);

      actualDISCProfileResults.push(discProfile)
    });

    done();
  });

  this.Then('SleepOnIt should give the following DISC results:', function (expectedProfiles, done) {
    let allTestsPass = true;

    expectedProfiles.raw().forEach(function (expectedProfileString, index) {
      let actualProfile = actualDISCProfileResults[index],
          expectedProfileObject = JSON.parse(expectedProfileString);

      if (actualProfile.D !== expectedProfileObject.D ||
          actualProfile.I !== expectedProfileObject.I ||
          actualProfile.S !== expectedProfileObject.S ||
          actualProfile.C !== expectedProfileObject.C) {
        console.log('Expected ' + JSON.stringify(expectedProfileObject) + ' but got ' + JSON.stringify(actualProfile));
        allTestsPass = false;
      }

    });

    assert.equal(allTestsPass, true, done);

    done();
  });

};