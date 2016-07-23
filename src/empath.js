import sentimentAnalyser from './analyseSentiment.js';
import discProfileAnalyser from './analyseDISCProfile.js';
import emailParser from './utils/emailParseUtil.js';
import readabilityAnalyser from './utils/calculateReadingLevel.js';
import egoismAnalyser from './utils/egoismAnalyser.js';

export default {
    sentimentAnalyser,
    discProfileAnalyser,
    emailParser,
    readabilityAnalyser,
    egoismAnalyser 
};
