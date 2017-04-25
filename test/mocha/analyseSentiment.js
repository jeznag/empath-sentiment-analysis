import assert from 'assert';
import analyseSentiment from '../../src/analyseSentiment';

describe('Sentiment Analyser', () => {
  it('should correctly identify sentiment for attributes of interest', function () {
    const email = `Hey guys,
    just letting you know that I really like Zoho Support!
    But I've gotta be honest: I really don't like Zoho Projects. It has a lot of problems. It needs the ability to have
    workflow statuses.`;
    const expectedOutput = {
        attributeScores: {
            'Zoho Support': 6,
            'Zoho Projects': -14
        }
    };
    const actualOutput = analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
    assert.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  });

  it('should correctly handle German messages', function () {
    const email = `Hallo Leute,
    ich will sagen dass ich Zoho Support wirklich mag!
    Aber ich muss ernstlich sein. Ich hasse unglaublicherweise Zoho Projects! Es hat viele Probleme. Z.b. es braucht
    die Faehigkeit mehrere Workflow Statuses zu haben.`;
    const expectedOutput = {
        attributeScores: {
            'Zoho Support': 2,
            'Zoho Projects': -15
        }
    };
    const actualOutput = analyseSentiment(email, ['Zoho Support', 'Zoho Projects']);
    assert.deepEqual(actualOutput.attributeScores, expectedOutput.attributeScores);
  });
});
