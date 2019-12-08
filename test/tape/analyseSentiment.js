import { test } from 'tape';
import analyseSentiment from '../../src/analyseSentiment.js';
import codeReviewComments from './data/codeReviews';

test('Sentiment Analyser should handle exclamation marks correctly', (expect) => {
  expect.plan(1);
  const actualOutput = analyseSentiment('This SUCKS!!!!');
  expect.equal(actualOutput.score, -102);
  expect.end();
});

test('Sentiment Analyser should correctly identify sentiment for attributes of interest', (expect) => {
  const email = `Hey guys,
    just letting you know that I really like Zoho Support!
    But I've gotta be honest: I really don't like Zoho Projects. It has a lot of problems. It needs the ability to have 
    workflow statuses.`;
  const expectedOutput = {
    attributeScores: {
      'Zoho Support': 4,
      'Zoho Projects': -4
    }
  };
  const actualOutput = analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
  expect.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  expect.end();
});

test('Sentiment Analyser should correctly handle rude code reviews', (expect) => {
  expect.plan(codeReviewComments.length);
  codeReviewComments.forEach((codeReviewCommentData) => {
    // eslint-disable-next-line no-console
    console.log(codeReviewCommentData.codeReviewMessage);
    const actualOutput = analyseSentiment(codeReviewCommentData.codeReviewMessage);
    expect.equal(actualOutput.score, codeReviewCommentData.expectedScore);
  });
  expect.end();
});

test('Sentiment Analyser should correctly handle German messages', function(expect) {
  const email = `Hallo Leute,
    ich will sagen dass ich Zoho Support wirklich mag!
    Aber ich muss ernstlich sein. Ich hasse unglaublicherweise Zoho Projects! Es hat viele Probleme. Z.b. es braucht
    die Faehigkeit mehrere Workflow Statuses zu haben.`;
  const expectedOutput = {
    attributeScores: {
      'Zoho Support': 2,
      'Zoho Projects': -3
    }
  };
  const actualOutput = analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
  expect.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  expect.end();
});
