import assert from 'assert';
import empath from '../../src/empath.js';

const email = `Hey guys,
just letting you know that I really like Zoho Support!
But I've gotta be honest: I really don't like Zoho Projects. It has a lot of problems. It needs the ability to have
workflow statuses.`;

describe('Empath', () => {

  it('should analyse sentiment successfully', () => {
      const expectedOutput = {
          attributeScores: {
              'Zoho Support': 6,
              'Zoho Projects': -14
          }
      };
      const actualOutput = empath.analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
      assert.equal(typeof actualOutput, 'object');
      assert.ok(actualOutput);
      assert.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  });

  it('should provide analyse DISC profile method', () => {
      assert.doesNotThrow(function () {
        empath.guessDISCProfile.analyseEmail(email);
      });
  });

  it('should provide human readable DISC profile guess method', () => {
      assert.doesNotThrow(function () {
        empath.guessDISCProfile.getUserReadableDISCProfile(email);
      });
  });

  it('should provide parseEmail method', () => {
      assert.doesNotThrow(function () {
        empath.parseEmail(email);
      });
  });

  it('should provide analyse readability method', () => {
      assert.doesNotThrow(function () {
          empath.calculateReadabilityScore(email);
      });
  });

  it('should provide analyse egoism method', () => {
      assert.doesNotThrow(function () {
          empath.analyseEgoism(email);
      });
  });
});
