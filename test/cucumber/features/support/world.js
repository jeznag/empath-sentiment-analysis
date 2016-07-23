
function WorldConstructor() {
    this.sentimentAnalyser = require('../../../../src/analyseSentiment.js');
    this.discProfileAnalyser = require('../../../../src/analyseDISCProfile.js').discProfileAnalyser;
    this.readabilityAnalyser = require('../../../../src/utils/calculateReadingLevel.js');
    this.egoismAnalyser = require('../../../../src/utils/egoismAnalyser.js');
}

module.exports.World = WorldConstructor;