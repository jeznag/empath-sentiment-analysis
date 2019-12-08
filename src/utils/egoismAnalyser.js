
export default function analyseEgoism(text) {
  if (text.length) {
    return analyseText(text);
  }

  return {
    selfish: 0,
    controlling: 0,
    conforming: 0
  };
}

const NON_WORD_CHARACTERS = /[";:,.?¿\-!¡]+/g;
const SELFISH_WORDS = /( i | my | mine | i'm | i'll )/g;
const IMPERATIVE_WORDS = /( you | your | yours | you're | you'll )/g;
const SELFLESS_WORDS = /( we | our | ours | let's | we're | we'll | you all | y'all | all of you | team )/g;

function analyseText(text) {
  const textWithLeadingAndTrailingSpace = ` ${text} `;
  const words = textWithLeadingAndTrailingSpace.toLowerCase().replace(NON_WORD_CHARACTERS, '');
  const selfishWords = words.match(SELFISH_WORDS);
  const controllingWords = words.match(IMPERATIVE_WORDS);
  const conformingWords = words.match(SELFLESS_WORDS);

  return {
    selfish: selfishWords ? selfishWords.length : 0,
    controlling: controllingWords ? controllingWords.length : 0,
    conforming: conformingWords ? conformingWords.length : 0
  };
}
