import analyseSentiment from './analyseSentiment.js';
import guessDISCProfile from './analyseDISCProfile.js';
import emailParseUtil from './utils/emailParseUtil.js';
import { calculateReadabilityScore } from './utils/calculateReadingLevel.js';
import analyseEgoism from './utils/egoismAnalyser.js';

export default {
  analyseSentiment,
  guessDISCProfile,
  parseEmail: emailParseUtil.removeQuotedTextFromEmail,
  calculateReadabilityScore,
  analyseEgoism
};
