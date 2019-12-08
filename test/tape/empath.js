import { test } from 'tape';
import empath from '../../src/empath.js';

const email = `Hey guys,
just letting you know that I really like Zoho Support!
But I've gotta be honest: I really don't like Zoho Projects. It has a lot of problems. It needs the ability to have 
workflow statuses.`;

test('Empath should analyse sentiment successfully', (expect) => {
  const expectedOutput = {
    attributeScores: {
      'Zoho Support': 4,
      'Zoho Projects': -4
    }
  };
  const actualOutput = empath.analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
  expect.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  expect.end();
});

test('Empath should provide analyse DISC profile method', (expect) => {
  expect.doesNotThrow(() => {
    empath.guessDISCProfile.analyseEmail(email);
  });
  expect.end();
});

test('Empath should provide human readable DISC profile guess method', (expect) => {
  expect.doesNotThrow(() => {
    empath.guessDISCProfile.getUserReadableDISCProfile(email);
  });
  expect.end();
});

test('Empath should provide parseEmail method', (expect) => {
  expect.doesNotThrow(() => {
    empath.parseEmail(email);
  });
  expect.end();
});

test('Empath should provide analyse readability method', (expect) => {
  expect.doesNotThrow(() => {
    empath.calculateReadabilityScore(email);
  });
  expect.end();
});

test('Empath should provide analyse egoism method', (expect) => {
  expect.doesNotThrow(() => {
    empath.analyseEgoism(email);
  });
  expect.end();
});
