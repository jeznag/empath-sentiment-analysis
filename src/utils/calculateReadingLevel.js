// adapted from https://www.npmjs.com/package/automated-readability-index

export function calculateReadabilityScore(text) {
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
  } if (readingLevel >= ADVANCED_THRESHOLD && readingLevel < SUPER_ADVANCED_THRESHOLD) {
    return 'advanced';
  } if (readingLevel >= SUPER_ADVANCED_THRESHOLD) {
    return 'very advanced';
  }

  return 'unknown';
}

const NON_WORD_CHARACTERS = /['";:,.?¿!¡-]+/g;

function analyseText(text) {
  const strippedText = text.replace(NON_WORD_CHARACTERS, '');
  const words = strippedText.match(/\S+/g);
  let numWords = 0;

  if (words) {
    numWords = words.length;
  }

  const numCharacters = strippedText.replace(/\s/g, '').length;
  return getAutomatedReadabilityIndex(numWords, numCharacters);
}

function getAutomatedReadabilityIndex(numWords, numCharacters) {
  return (numCharacters / numWords).toFixed(1);
}
