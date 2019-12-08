import sentimentAnalyser from './analyseSentiment.js';
import egoismAnalyser from './utils/egoismAnalyser.js';
import { calculateReadabilityScore } from './utils/calculateReadingLevel.js';

function getUserReadableDISCProfile(emailContents) {
  const bestGuessAtDISCProfile = analyseEmail(emailContents);
  let highestProfileScore = 1;
  let highestProfile = '';
  let secondHighestProfileScore = 1;
  let secondHighestProfile = '';

  Object.keys(bestGuessAtDISCProfile).forEach((profile) => {
    if (bestGuessAtDISCProfile[profile] > highestProfileScore) {
      highestProfile = profile;
      highestProfileScore = bestGuessAtDISCProfile[profile];
    } else if (bestGuessAtDISCProfile[profile] > secondHighestProfileScore) {
      secondHighestProfile = profile;
      secondHighestProfileScore = bestGuessAtDISCProfile[profile];
    }
  });

  return highestProfile + secondHighestProfile;
}

/**
 * Attempts to guess the DISC profile of a sender based on an email they've sent
 *
 * @param {String} emailContents  Contents of email to analyse
 * @param {Integer} readabilityScore  Readability score of email (analysed already)
 *
 * @return {Object}
 */
function analyseEmail(emailContents = '') {
  const readabilityScore = calculateReadabilityScore(emailContents);
  const guessAtDISCProfile = {
    D: 1,
    I: 1,
    S: 1,
    C: 1,
  };

  const guessWithSentiment = {
    ...addGuessBasedOnSentiment(emailContents, guessAtDISCProfile)
  };
  const guessWithVocab = {
    ...addGuessBasedOnVocabulary(readabilityScore, guessWithSentiment)
  };
  const guessWithEgoism = {
    ...addGuessBasedOnEgoism(emailContents, guessWithVocab)
  };

  const normalisedGuesses = {
    ...reduceGuessesThatExceedThreshold(guessWithEgoism)
  };

  return normalisedGuesses;
}

function addGuessBasedOnSentiment(emailContents, guessAtDISCProfile) {
  const sentimentScore = sentimentAnalyser(emailContents).score;
  const lengthOfEmail = emailContents.length;
  const LENGTH_OF_SHORT_EMAIL = 30;
  const CHEERFUL_SENTIMENT_SCORE = 5;
  const HYPER_CHEERFUL_SENTIMENT_SCORE = 15;

  const processedGuess = { ...guessAtDISCProfile };

  if (sentimentScore < CHEERFUL_SENTIMENT_SCORE) {
    if (lengthOfEmail < LENGTH_OF_SHORT_EMAIL) {
      processedGuess.D += 4;
    } else {
      processedGuess.C += 3;
    }
  } else if (sentimentScore > HYPER_CHEERFUL_SENTIMENT_SCORE) {
    processedGuess.I += 5;
  } else {
    processedGuess.S += 3;
  }

  return processedGuess;
}

function addGuessBasedOnVocabulary(readabilityScore, guessAtDISCProfile) {
  const ADVANCED_VOCAB_LEVEL = 4.0;
  const processedGuess = { ...guessAtDISCProfile };

  if (readabilityScore >= ADVANCED_VOCAB_LEVEL) {
    processedGuess.C += 2;
  }

  return processedGuess;
}

function addGuessBasedOnEgoism(emailContents, guessAtDISCProfile) {
  const egoismScores = egoismAnalyser(emailContents);
  const processedGuess = { ...guessAtDISCProfile };

  if (egoismScores.selfish > egoismScores.controlling
        && egoismScores.selfish > egoismScores.conforming) {
    processedGuess.I += 2;
  } else if (egoismScores.controlling > egoismScores.selfish
        && egoismScores.controlling > egoismScores.conforming) {
    processedGuess.D += 2;
  } else if (egoismScores.conforming > egoismScores.controlling) {
    processedGuess.S += 2;
  }

  return processedGuess;
}

function reduceGuessesThatExceedThreshold(guessAtDISCProfile) {
  const processedGuess = { ...guessAtDISCProfile };
  const MAX_SCORE = 7;

  Object.keys(processedGuess).forEach((profile) => {
    if (processedGuess[profile] > MAX_SCORE) {
      processedGuess[profile] = MAX_SCORE;
    }
  });

  return processedGuess;
}

export default {
  analyseEmail,
  getUserReadableDISCProfile
};
