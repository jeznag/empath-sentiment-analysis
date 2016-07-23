import sentimentAnalyser from './analyseSentiment.js';
import egoismAnalyser from './utils/egoismAnalyser.js';
import { calculateReadabilityScore } from './utils/calculateReadingLevel.js';

let sentimentScores,
    prefixModifiers,
    postfixModifiers,
    currentPrefixModifierScore,
    currentPostfixModifierScore,
    lastNormalTokenSentimentScore;

function getUserReadableDISCProfile(emailContents) {
    const bestGuessAtDISCProfile = analyseEmail(emailContents);
    let highestProfileScore = 1;
    let highestProfile = '';
    let secondHighestProfileScore = 1;
    let secondHighestProfile = '';

    Object.keys(bestGuessAtDISCProfile).forEach(function (profile) {
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
        'D': 1,
        'I': 1,
        'S': 1,
        'C': 1,
    };

    addGuessBasedOnSentiment(emailContents, guessAtDISCProfile);
    addGuessBasedOnVocabulary(readabilityScore, guessAtDISCProfile);
    addGuessBasedOnEgoism(emailContents, guessAtDISCProfile);

    reduceGuessesThatExceedThreshold(guessAtDISCProfile);

    return guessAtDISCProfile;
}

function addGuessBasedOnSentiment(emailContents, guessAtDISCProfile) {
    const sentimentScore = sentimentAnalyser(emailContents).score;
    const lengthOfEmail = emailContents.length;
    const LENGTH_OF_SHORT_EMAIL = 30;
    const CHEERFUL_SENTIMENT_SCORE = 5;
    const HYPER_CHEERFUL_SENTIMENT_SCORE = 15;

    if (sentimentScore < CHEERFUL_SENTIMENT_SCORE) {
        if (lengthOfEmail < LENGTH_OF_SHORT_EMAIL) {
            guessAtDISCProfile.D += 4;
        }
        else {
            guessAtDISCProfile.C += 3;
        }
    } else {
        if (sentimentScore > HYPER_CHEERFUL_SENTIMENT_SCORE) {
            guessAtDISCProfile.I += 5;
        } else {
            guessAtDISCProfile.S += 3;
        }
    }
}

function addGuessBasedOnVocabulary(readabilityScore, guessAtDISCProfile) {
    const ADVANCED_VOCAB_LEVEL = 4.0;

    if (readabilityScore >= ADVANCED_VOCAB_LEVEL) {
        guessAtDISCProfile.C += 2;
    }
}

function addGuessBasedOnEgoism(emailContents, guessAtDISCProfile) {
    var egoismScores = egoismAnalyser(emailContents);

    if (egoismScores.selfish > egoismScores.controlling && 
        egoismScores.selfish > egoismScores.conforming) {

        guessAtDISCProfile.I += 2;

    } else if (egoismScores.controlling > egoismScores.selfish && 
        egoismScores.controlling > egoismScores.conforming) {

        guessAtDISCProfile.D += 2;

    } else if (egoismScores.conforming > egoismScores.controlling) {
        guessAtDISCProfile.S += 2;
    } 
}

function reduceGuessesThatExceedThreshold(guessAtDISCProfile) {
    const MAX_SCORE = 7;

    Object.keys(guessAtDISCProfile).forEach(function (profile) {
        if (guessAtDISCProfile[profile] > MAX_SCORE) {
            guessAtDISCProfile[profile] = MAX_SCORE;
        }
    });
}

export default {
    analyseEmail,
    getUserReadableDISCProfile
};
