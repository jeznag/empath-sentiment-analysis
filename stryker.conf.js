module.exports = function (config) {
  config.set({
    files: [
      'test/mocha/**/*.js',
      { pattern: 'src/analyseSentiment.js', included: false, mutated: true },
      { pattern: 'src/sentimentWordList.js', included: false, mutated: false },
      { pattern: 'src/**/*.js', included: false, mutated: true },
    ],
    testFramework: 'mocha',
    maxConcurrentTestRunners: 6,
    testRunner: 'mocha',
    coverageAnalysis: 'off',
    reporter: ['progress', 'html'],
    logLevel: 'trace',
    // plugins: ['stryker-mocha-runner', 'stryker-html-reporter']
  });
};
