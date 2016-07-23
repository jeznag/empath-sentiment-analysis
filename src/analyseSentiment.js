import _ from '../node_modules/underscore/underscore.js';
import sentimentWordLists from './sentimentWordList.js';
import * as regexList from './utils/regexList.js';

export let analyseSentiment = (function () {
    'use strict';

    let currentPrefixes = [];
    let currentPostfixes = [];
    let sentimentScores,
        prefixModifiers,
        postfixModifiers,
        currentPrefixModifierScore,
        currentPostfixModifierScore,
        lastNormalTokenSentimentScore;

    /**
     * Modified from https://github.com/thisandagain/sentiment/blob/master/lib/index.js
     * Performs sentiment analysis on the provided input "phrase".
     *
     * @param {String} Input phrase
     * @param {Object} Optional sentiment additions to sentimentScores (hash k/v pairs)
     *
     * @return {Object}
     */
    function analyseSentiment (phrase = '', attributesOfInterest = [], inject = null, callback = null) {
        let result;

        Object.keys(sentimentWordLists).forEach(function (wordListKey) {
            //try another word list if we don't get any matches
            if (!result || result.tryAnotherWordList) {
                result = useWordListToAnalyseSentiment(sentimentWordLists[wordListKey], phrase, attributesOfInterest, inject, callback);
            }
        });

        return result;
    }

    function useWordListToAnalyseSentiment (wordList, phrase, attributesOfInterest, inject, callback) {
        setupWordList(wordList, inject);

        // Storage objects
        let tokens      = tokenize(phrase),
            score       = 0,
            words       = [],
            positive    = [],
            negative    = [],
            scoreForCurrentSentence = 0,
            attributeScores = {},
            currentAttributeBeingDiscussed,
            tryAnotherWordList = false,
            THRESHOLD_BEFORE_WE_TRY_ANOTHER_WORDLIST = 50;

        currentPrefixModifierScore = 1;
        currentPostfixModifierScore = 1;
        lastNormalTokenSentimentScore = 0;

        tokens.forEach(function(word, index) {

            const isFinalWord = index === tokens.length - 1;

            if (tokens.length < 3 && index > THRESHOLD_BEFORE_WE_TRY_ANOTHER_WORDLIST) {
                tryAnotherWordList = true;
                return;
            }

            const wordSentimentAnalysis = analyseSentimentForWord(word, isFinalWord);
            const wordSentimentScore = wordSentimentAnalysis.score;
            const processedWord = wordSentimentAnalysis.word;
            const attributeCorrespondingToThisWord = getAttributeCorrespondingToThisWord(word, attributesOfInterest, tokens, index);
            const hasSameWordAfterwards = tokens[index + 1] === word;
            const endOfSentence = (word === '?' || word === '!' || word === '.') &&
                //don't consider sentence over if the next word is same e.g !!!
                !hasSameWordAfterwards;
                
            if (attributeCorrespondingToThisWord) {
                if (!attributeScores[attributeCorrespondingToThisWord]) {
                    attributeScores[attributeCorrespondingToThisWord] = 0;
                }

                currentAttributeBeingDiscussed = attributeCorrespondingToThisWord;
            }

            scoreForCurrentSentence += wordSentimentScore;

            if (endOfSentence) {
                //end of sentence - give score to current attribute
                //e.g. Sentence is "I really like Zoho Support" - should get score from `really like`
                if (currentAttributeBeingDiscussed) {
                    attributeScores[currentAttributeBeingDiscussed] += scoreForCurrentSentence;
                }
                scoreForCurrentSentence = 0;
            }

            if (!wordSentimentScore) {
                return;
            }

            words.push(processedWord);

            if (wordSentimentScore > 0) {
                positive.push(processedWord);
            } else if (wordSentimentScore < 0) {
                negative.push(processedWord);
            }

            score += wordSentimentScore;
        });

        let result = {
            wordListDidNotMatch: tryAnotherWordList,
            score:          score,
            comparative:    score / tokens.length,
            tokens:         tokens,
            words:          words,
            positive:       positive,
            negative:       negative,
            attributeScores: attributeScores
        };

        if (callback === null) {
            return result;
        }

        _.defer(function () {
            callback(null, result);
        });
    }

    function analyseSentimentForWord(word, isFinalWord) {
        const lowerCaseWord = word.toLowerCase();
        const tokenPrefixModifierScore = prefixModifiers[lowerCaseWord];
        const tokenPostfixModifierScore = postfixModifiers[lowerCaseWord];
        const tokenSentimentScore = sentimentScores[lowerCaseWord];
        const isAllUpperCase = word.toUpperCase() === word;
        const MULTIPLIER_FOR_ALL_UPPER_CASE = 2;
        let processedSentimentScore = 0;
        let shouldAddToScore = tokenPrefixModifierScore || tokenPostfixModifierScore || tokenSentimentScore;
        let processedWord;

        if (tokenPrefixModifierScore) {
            currentPrefixes.push(word);
            currentPrefixModifierScore *= (tokenPrefixModifierScore);
            shouldAddToScore = false;
        }

        if (tokenPostfixModifierScore) {
            currentPostfixes.push(word);
            currentPostfixModifierScore *= (tokenPostfixModifierScore - 1);
            shouldAddToScore = false;
        }

        if (tokenSentimentScore) {
            lastNormalTokenSentimentScore = tokenSentimentScore;

            if (isAllUpperCase) {
                lastNormalTokenSentimentScore *= MULTIPLIER_FOR_ALL_UPPER_CASE;
            }
        }

        if (isFinalWord) {
            shouldAddToScore = true;
        }

        if (lastNormalTokenSentimentScore && shouldAddToScore) {
            processedSentimentScore = lastNormalTokenSentimentScore * currentPrefixModifierScore * currentPostfixModifierScore;
            currentPrefixModifierScore = 1;
            currentPostfixModifierScore = 1;
            processedWord = currentPrefixes.join(' ') + ' ' + word + ' ' + currentPostfixes.join(' ');
            currentPostfixes = [];
            currentPrefixes = [];
        }

        return {
            score: processedSentimentScore,
            word: processedWord
        };
    }

    function setupWordList(sentimentWordList, inject) {
        if (!sentimentScores) {
            sentimentScores = _.clone(sentimentWordList.SENTIMENT_SCORES);
        }

        if (!prefixModifiers) {
            prefixModifiers = _.clone(sentimentWordList.PREFIX_MODIFIERS);
        }

        if (!postfixModifiers) {
            postfixModifiers = _.clone(sentimentWordList.POSTFIX_MODIFIERS);
        }

        // Merge
        if (inject !== null) {
            sentimentScores = _.extend(sentimentScores, inject);
        }
    }

    /**
     * Tokenizes an input string.
     *
     * @param {String} Input
     *
     * @return {Array}
     */
    function tokenize (input) {

        if (!input) {
            return input;
        }

        const BR_Tags = 'divbr',
              EXCLAMATION_MARKS = /(\!)/g,
              QUESTION_MARKS = /\?/g,
              FULL_STOPS = /\./g,
              EXTRA_SPACES = '/ {2,}/';

        return input
            .replace(regexList.EMOJI_REGEX, ' $1 ')
            .replace(BR_Tags, '')
            .replace(EXCLAMATION_MARKS, ' $1 ')
            .replace(QUESTION_MARKS, ' ? ')
            .replace(FULL_STOPS, ' . ')
            .replace(EXTRA_SPACES,' ')
            .split(' ')
            .filter(token => token.length);
    }

    function getAttributeCorrespondingToThisWord(word, attributesOfInterest, tokens, wordIndex) {
        const attributesOfInterestLowerCase = attributesOfInterest.map(attribute => attribute.toLowerCase());
        let attributeFound;

        attributesOfInterestLowerCase.forEach(function (attribute) {
            if (!attributeFound) {
                const attributeParts = attribute.split(' ');
                attributeParts.forEach(function (attributePart, attributePartIndex) {
                    if (!attributeFound) {
                        attributeFound = checkThatAllAttributePartsMatch(attribute, attributeParts, attributePart, attributePartIndex, word, tokens, wordIndex);
                    }
                });
            }
        });

        return attributesOfInterest[attributesOfInterestLowerCase.indexOf(attributeFound)];
    }

    function checkThatAllAttributePartsMatch (attribute, attributeParts, attributePart, attributePartIndex, word, tokens, wordIndex) {
        let attributeFound;
        if (!attributeFound && attributePart === word.toLowerCase()) {
            if (attributeParts.length > 1) {
                let entirePhraseMatches = true;
                for (let i = attributePartIndex; i > 0 && entirePhraseMatches; i--) {
                    if (attributeParts[i] !== tokens[wordIndex - (attributePartIndex - i)].toLowerCase()) {
                        entirePhraseMatches = false;
                    }
                }
                for (let i = attributePartIndex; i < attributeParts.length && entirePhraseMatches; i++) {
                    if (attributeParts[i] !== tokens[wordIndex + (i - attributePartIndex)].toLowerCase()) {
                        entirePhraseMatches = false;
                    }
                }

                if (entirePhraseMatches) {
                    attributeFound = attribute;
                }
            } else {
                attributeFound = attribute;
            }
        }
        return attributeFound;
    }

    return analyseSentiment;
})();