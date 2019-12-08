import discProfileAnalyser from '../../../../src/analyseDISCProfile.js';
import sentimentAnalyser from '../../../../src/analyseSentiment.js';
import { calculateReadabilityScore } from '../../../../src/utils/calculateReadingLevel.js';
import analyseEgoism from '../../../../src/utils/egoismAnalyser.js';

function WorldConstructor() {
  this.sentimentAnalyser = sentimentAnalyser;
  this.discProfileAnalyser = discProfileAnalyser;
  this.readabilityAnalyser = calculateReadabilityScore;
  this.egoismAnalyser = analyseEgoism;
}

module.exports.World = WorldConstructor;
