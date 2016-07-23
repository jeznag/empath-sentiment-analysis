//adapted from https://www.npmjs.com/package/automated-readability-index

export function calculateReadabilityScore (text) {
  if (text.length) {
    return analyseText(text);
  }

  return 0;
}

export function getQualitativeVocabularyLevel(text) {
  const readingLevel = calculateReadabilityScore(text);
  const ADVANCED_THRESHOLD = 8;
  const SUPER_ADVANCED_THRESHOLD = 12;

  if (readingLevel < ADVANCED_THRESHOLD) {
    return 'basic';
  } else if (readingLevel >= ADVANCED_THRESHOLD && readingLevel < SUPER_ADVANCED_THRESHOLD) {
    return 'advanced';
  } else if (readingLevel >= SUPER_ADVANCED_THRESHOLD) {
    return 'very advanced';
  }
}

const NON_WORD_CHARACTERS = /['";:,.?¿\-\—!¡]+/g;

function analyseText(text) {
  const strippedText = text.replace(NON_WORD_CHARACTERS, '');
  const words = strippedText.match(/\S+/g);
  let numWords = 0;
  let numCharacters, readabilityScore;

  if (words) {
    numWords = words.length;
  };

  numCharacters = strippedText.replace(/\s/g, '').length;
  readabilityScore = getAutomatedReadabilityIndex(numWords, numCharacters);

  return readabilityScore;
}

function getAutomatedReadabilityIndex(numWords, numCharacters) {
  return (numCharacters / numWords).toFixed(1);
}
