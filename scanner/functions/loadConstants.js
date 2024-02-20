function loadConstants(constantsJson, gameURL, isDebugLayer, result) {
    if (! constantsJson) { return; }

    // Sort constants alphabetically
    const keys = Object.keys(constantsJson);
    keys.sort();
    let hasReferences = false;
    for (let i = 0; i < keys.length; ++i) {
        const c = keys[i];
        const definition = constantsJson[c];
        if ((definition.type === 'raw') && (definition.url !== undefined)) {
            if (isDebugLayer) {
                throw 'raw url constants not supported in debug.json (' + c + ')';
            }
            
            // Raw value loaded from a URL
            const constantURL = makeURLAbsolute(gameURL, definition.url);
            if (/\.json$/.test(constantURL)) {
                loadManager.fetch(constantURL, 'json', nullToUndefined, function (data) {
                    result[c] = data;
                }, undefined, undefined, true);
            } else if (/\.yml$/.test(constantURL)) {
                loadManager.fetch(constantURL, 'text', null, function (yaml) {
                    const json = jsyaml.load(yaml);
                    result[c] = nullToUndefined(json);
                }, undefined, undefined, true);
            } else {
                throw 'Unsupported file format for ' + definition.url;
            }
        } else if ((definition.type === 'table' || definition.type === 'array') && (definition.url !== undefined)) {
            if (isDebugLayer) {
                throw definition.type + ' url constants not supported in debug.json (' + c + ')';
            }
            // Raw value loaded from a URL
            const constantURL = makeURLAbsolute(gameURL, definition.url);
            loadCSV(constantURL, definition, gameSource.constants, c);
        } else if ((definition.type === 'string') && (definition.url !== undefined)) {
            if (isDebugLayer) {
                throw 'string url constants not supported in debug.json (' + c + ')';
            }
            // Raw value loaded from a URL
            const constantURL = makeURLAbsolute(gameURL, definition.url);
            loadTXT(constantURL, definition, gameSource.constants, c);
        } else if (definition.type === 'reference') {
            // Defer evaluation until binding time.
            result[c] = new GlobalReferenceDefinition(c, definition);
        } else {
            // Inline value
            result[c] = evalJSONGameConstant(definition);
        }
    }
}