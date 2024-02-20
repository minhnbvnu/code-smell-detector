function parseThreeConstants() {
    var content = fse.readFileSync(path.resolve(threeSrcDir, 'constants.js'), 'utf-8');
    var result;
    eval('result = new function() {\n' + content.replace(/export var (.*?);/g, 'var $1;\nthis.$1;') + '}()');
    return result;
}