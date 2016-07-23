import { exec } from 'child_process';

exec('babel-tape-runner test/tape/*.js', function(err, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
});

exec('node_modules/.bin/babel-node node_modules/.bin/cucumber.js test/cucumber/features', function(err, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
});
