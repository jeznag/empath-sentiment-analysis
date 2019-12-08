import sentimentWordLists from './sentimentWordList.js';
import regexList from './utils/regexList.js';

let currentPrefixes = [];
let currentPostfixes = [];
let sentimentScores;
let prefixModifiers;
let postfixModifiers;
let currentPrefixModifierScore;
let currentPostfixModifierScore;
let lastNormalTokenSentimentScore;

/**
 * Modified from https://github.com/thisandagain/sentiment/blob/master/lib/index.js
 * Performs sentiment analysis on the provided input "phrase".
 *
 * @param {String} Input phrase
 * @param {Object} Optional sentiment additions to sentimentScores (hash k/v pairs)
 *
 * @return {Object}
 */
export default function analyseSentiment(
  phrase = '',
  attributesOfInterest = [],
  inject = null,
  callback = null
) {
  let result;

  Object.keys(sentimentWordLists).forEach((wordListKey) => {
    // try another word list if we don't get any matches
    if (!result || result.tryAnotherWordList) {
      result = useWordListToAnalyseSentiment(
        sentimentWordLists[wordListKey],
        phrase,
        attributesOfInterest,
        inject,
        callback
      );
    }
  });

  return result;
}

/* Sometimes a word is innocuous on its own but
 * super mean/nice when combined with other words.
 * e.g. "just" can be a positive word ("a just society")
 * but "why don't you just..." is pretty patronising.
 * This function merges multi-word phrases into one
 * so that they can be analysed as a unit.
 */
function preProcessMultiWordPhrases(wordList, phrase) {
  const { WORDS_TO_COMBINE } = wordList;
  return WORDS_TO_COMBINE.reduce((modifiedPhrase, subPhrase) => {
    const subPhraseWithUnderscores = subPhrase.replace(/\s/g, '_');
    return modifiedPhrase.replace(new RegExp(subPhrase, 'gi'), subPhraseWithUnderscores);
  }, phrase);
}

function useWordListToAnalyseSentiment(
  wordList,
  phrase,
  attributesOfInterest,
  inject,
  callback
) {
  setupWordList(wordList, inject);

  const processedPhrase = preProcessMultiWordPhrases(wordList, phrase);

  // Storage objects
  const tokens = tokenize(processedPhrase);
  let score = 0;
  const words = [];
  const positive = [];
  const negative = [];
  let scoreForCurrentSentence = 0;
  const attributeScores = {};
  let currentAttributeBeingDiscussed;
  let tryAnotherWordList = false;
  const THRESHOLD_BEFORE_WE_TRY_ANOTHER_WORDLIST = 50;

  currentPrefixModifierScore = 1;
  currentPostfixModifierScore = 1;
  lastNormalTokenSentimentScore = 0;

  tokens.forEach((word, index) => {
    const isFinalWord = index === tokens.length - 1;

    if (tokens.length < 3 && index > THRESHOLD_BEFORE_WE_TRY_ANOTHER_WORDLIST) {
      tryAnotherWordList = true;
      return;
    }

    const wordSentimentAnalysis = analyseSentimentForWord(word, isFinalWord);
    const wordSentimentScore = wordSentimentAnalysis.score;
    const processedWord = wordSentimentAnalysis.word && wordSentimentAnalysis.word.replace(/_/g, ' ');
    const attributeCorrespondingToThisWord = getAttributeCorrespondingToThisWord(
      word,
      attributesOfInterest,
      tokens,
      index
    );
    const hasSameWordAfterwards = tokens[index + 1] === word;
    const endOfSentence = (word === '?' || word === '!' || word === '.')
      // don't consider sentence over if the next word is same e.g !!!
      && !hasSameWordAfterwards;

    if (attributeCorrespondingToThisWord) {
      if (!attributeScores[attributeCorrespondingToThisWord]) {
        attributeScores[attributeCorrespondingToThisWord] = 0;
      }

      currentAttributeBeingDiscussed = attributeCorrespondingToThisWord;
    }

    scoreForCurrentSentence += wordSentimentScore;

    if (endOfSentence) {
      // end of sentence - give score to current attribute
      // e.g. Sentence is "I really like Zoho Support" - should get score from `really like`
      if (currentAttributeBeingDiscussed) {
        attributeScores[currentAttributeBeingDiscussed] += scoreForCurrentSentence;
      }
      scoreForCurrentSentence = 0;

      currentPrefixModifierScore = 1;
      currentPostfixModifierScore = 1;
      lastNormalTokenSentimentScore = 0;
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

  const result = {
    wordListDidNotMatch: tryAnotherWordList,
    score,
    comparative: score / tokens.length,
    tokens,
    words,
    positive,
    negative,
    attributeScores
  };

  if (callback === null) {
    return result;
  }

  return setTimeout(() => {
    callback(null, result);
  }, 0);
}

function analyseSentimentForWord(word, isFinalWord) {
  const lowerCaseWord = word.toLowerCase();
  const tokenPrefixModifierScore = prefixModifiers[lowerCaseWord];
  const tokenPostfixModifierScore = postfixModifiers[lowerCaseWord];
  const tokenSentimentScore = sentimentScores[lowerCaseWord];
  const isAllUpperCase = word.toUpperCase() === word;
  const MULTIPLIER_FOR_ALL_UPPER_CASE = 2;
  let processedSentimentScore = 0;
  let shouldAddToScore = !!tokenSentimentScore;
  let processedWord;

  if (tokenPrefixModifierScore) {
    currentPrefixes.push(word);
    currentPrefixModifierScore *= tokenPrefixModifierScore;
  }

  if (tokenPostfixModifierScore) {
    currentPostfixes.push(word);
    currentPostfixModifierScore *= (tokenPostfixModifierScore - 1);
  }

  if (tokenSentimentScore) {
    lastNormalTokenSentimentScore = tokenSentimentScore;

    if (isAllUpperCase) {
      lastNormalTokenSentimentScore *= MULTIPLIER_FOR_ALL_UPPER_CASE;
    }
  }

  if (isFinalWord && tokenPostfixModifierScore) {
    shouldAddToScore = true;
  }

  // we should only add the score if:
  // a. it's a word with a score (e.g. good)
  // b. this is the final token in the sentence and there's a postfix modifier (e.g. !!!!)
  if (lastNormalTokenSentimentScore && shouldAddToScore) {
    processedSentimentScore =
      lastNormalTokenSentimentScore * currentPrefixModifierScore * currentPostfixModifierScore;

    processedWord = `${currentPrefixes.join(' ')} ${word} ${currentPostfixes.join(' ')}`;
    currentPostfixes = [];
    currentPrefixes = [];
  }

  if (isFinalWord) {
    currentPrefixModifierScore = 1;
    currentPostfixModifierScore = 1;
  }

  return {
    score: processedSentimentScore,
    word: processedWord
  };
}

function setupWordList(sentimentWordList, inject) {
  if (!sentimentScores) {
    sentimentScores = { ...sentimentWordList.SENTIMENT_SCORES };
  }

  if (!prefixModifiers) {
    prefixModifiers = { ...sentimentWordList.PREFIX_MODIFIERS };
  }

  if (!postfixModifiers) {
    postfixModifiers = { ...sentimentWordList.POSTFIX_MODIFIERS };
  }

  // Merge
  if (inject !== null) {
    sentimentScores = { ...sentimentScores, ...inject };
  }
}

/**
 * Tokenizes an input string.
 *
 * @param {String} Input
 *
 * @return {Array}
 */
function tokenize(input) {
  if (!input) {
    return input;
  }

  const BR_TAGS = 'divbr';
  const EXCLAMATION_MARKS = /(!)/g;
  const QUESTION_MARKS = /\?/g;
  const FULL_STOPS = /\./g;
  const COMMAS = /,/g;
  const EXTRA_SPACES = '/ {2,}/';

  return input
    .replace(regexList.EMOJI_REGEX, ' $1 ')
    .replace(BR_TAGS, '')
    .replace(EXCLAMATION_MARKS, ' $1 ')
    .replace(QUESTION_MARKS, ' ? ')
    .replace(FULL_STOPS, ' . ')
    .replace(COMMAS, ' , ')
    .replace(EXTRA_SPACES, ' ')
    .split(' ')
    .filter((token) => token.length);
}

function getAttributeCorrespondingToThisWord(word, attributesOfInterest, tokens, wordIndex) {
  const attributesOfInterestLowerCase = attributesOfInterest.map((attribute) => attribute.toLowerCase());
  let attributeFound;

  attributesOfInterestLowerCase.forEach((attribute) => {
    if (!attributeFound) {
      const attributeParts = attribute.split(' ');
      attributeParts.forEach((attributePart, attributePartIndex) => {
        if (!attributeFound) {
          attributeFound = checkThatAllAttributePartsMatch(
            attribute,
            attributeParts,
            attributePart,
            attributePartIndex,
            word,
            tokens,
            wordIndex
          );
        }
      });
    }
  });

  return attributesOfInterest[attributesOfInterestLowerCase.indexOf(attributeFound)];
}

function checkThatAllAttributePartsMatch(
  attribute,
  attributeParts,
  attributePart,
  attributePartIndex,
  word,
  tokens,
  wordIndex
) {
  let attributeFound;
  if (!attributeFound && attributePart === word.toLowerCase()) {
    if (attributeParts.length > 1) {
      let entirePhraseMatches = true;
      for (let i = attributePartIndex; i > 0 && entirePhraseMatches; i -= 1) {
        if (attributeParts[i] !== tokens[wordIndex - (attributePartIndex - i)].toLowerCase()) {
          entirePhraseMatches = false;
        }
      }
      for (let i = attributePartIndex; i < attributeParts.length && entirePhraseMatches; i += 1) {
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
