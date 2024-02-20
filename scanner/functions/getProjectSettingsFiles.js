async function getProjectSettingsFiles (projectRoot) {
    const cfgXml = _fetchFileContents(cdvLibUtil.projectConfig(projectRoot));

    // Create package.json snippet
    const pkgJson = require(path.join(projectRoot, 'package'));
    const pkgSnippet = [
        '--- Start of Cordova JSON Snippet ---',
        JSON.stringify(pkgJson.cordova, null, 2),
        '--- End of Cordova JSON Snippet ---'
    ].join('\n');

    return {
        key: 'Project Setting Files',
        children: [
            { key: 'config.xml', value: `${cfgXml}` },
            { key: 'package.json', value: pkgSnippet }
        ]
    };
}