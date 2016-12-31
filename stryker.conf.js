module.exports = function (config) {
  config.set({
    files: ['test/tape/**/*.js', { pattern: 'src/**/*.js', included: false, mutated: true }],
    testFramework: 'tape',
    maxConcurrentTestRunners: 3,
    testRunner: 'tape',
    coverageAnalysis: 'off',
    reporter: ['progress', 'clear-text'],
    logLevel: 'info',
    plugins: ['stryker-tape-runner']
  });
};
