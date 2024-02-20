function getFixture(fixtureName) {
    const fileCoverage = istanbulLibCoverage.createFileCoverage('foo.js');
    fileCoverage.data = require('../fixtures/' + fixtureName + '.json');
    return fileCoverage;
}