/* eslint-env node */
var fs = require('fs');

var suffix = '\n\n Commit Passes Testing';
var gitParams = process.env.GIT_PARAMS;

fs.appendFileSync(gitParams, suffix);
