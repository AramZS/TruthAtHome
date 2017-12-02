/* eslint-env node */
var fs = require('fs');

var suffix = '\n\n__BLESSED__';
var gitParams = process.env.GIT_PARAMS;

fs.appendFileSync(gitParams, suffix);
