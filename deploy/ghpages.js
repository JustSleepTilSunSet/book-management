const path = require('path');
const ghpages = require('gh-pages');

const options = {
    branch: 'gh-pages',
    repo: process.env.PROJECT1_REPO // project github repo
};

const callback = err => {
    if (err) console.error(err);
    else console.log('publish success');
};

ghpages.publish(path.resolve(__dirname, '../dist'), options, callback);