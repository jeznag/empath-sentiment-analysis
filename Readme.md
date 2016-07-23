Empath can be used to perform client side sentiment analysis. It is designed to work with emails.

Features include:
- multilingual sentiment analysis (German and English supported currently)
- DISC profile analysis
- email signature recognition (so only the email body gets analysed)
- egoismAnalyser (so you can figure out how selfish someone is based on their communication)

Usage:
1. npm install --save-dev empath-sentiment-analysis

2. Sentiment analyser:

Modified from https://github.com/thisandagain/sentiment/blob/master/lib/index.js

import empath from 'empath-sentiment-analysis';
empath.analyseSentiment(phrase = '', attributesOfInterest = []);

Result: 
{
    wordListDidNotMatch: tryAnotherWordList,
    score:          score,
    comparative:    score / tokens.length,
    tokens:         tokens,
    words:          words,
    positive:       positive,
    negative:       negative,
    attributeScores: attributeScores
};

Attribute scores are useful if you have a number of products for which you want to analyse sentiment. Review the test cases for more details.

3. DISC Profile Guesser

import empath from 'empath-sentiment-analysis';
empath.guessDISCProfile.getUserReadableDISCProfile(email);

result: 
{
    'D': D,
    'I': I,
    'S': S,
    'C': C,
}

or
empath.guessDISCProfile.getUserReadableDISCProfile(email);

result: two letters indicating primary and secondary profile, e.g. DC

4. Email parser

import empath from 'empath-sentiment-analysis';
const emailWithoutSignatureAndQuotedReplies = empath.parseEmail(email);

If you supply an email with a long signature and quoted replies from the thread, it will trim everything except the first email.

5. Readability analyser

import empath from 'empath-sentiment-analysis';
const readabilityScore = empath.calculateReadabilityScore(email);

Anything above 4.0 is considered advanced vocab

6. Egoism analyser

import empath from 'empath-sentiment-analysis';
const egoismScore = empath.analyseEgoism(email);

Result:
{
    selfish, 
    controlling, 
    conforming
};

Selfish = number of selfish words used
Controlling = number of command/imperative words used
Conforming = number of we/group style words

Ratio can yield interesting insights about personality