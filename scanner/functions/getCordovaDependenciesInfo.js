async function getCordovaDependenciesInfo () {
    // get self "Cordova CLI"
    const cliPkg = require('../package');
    const cliDependencies = await _getLibDependenciesInfo(cliPkg.dependencies);

    const libPkg = require('cordova-lib/package');
    const cliLibDep = cliDependencies.find(({ key }) => key === 'lib');
    cliLibDep.children = await _getLibDependenciesInfo(libPkg.dependencies);

    return {
        key: 'Cordova Packages',
        children: [{
            key: 'cli',
            value: cliPkg.version,
            children: cliDependencies
        }]
    };
}