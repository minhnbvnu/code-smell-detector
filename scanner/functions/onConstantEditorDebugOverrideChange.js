function onConstantEditorDebugOverrideChange(gameSource, name, checkbox) {
    // Ensure that the constant exists in the json, creating it if needed
    let created = false;
    if (! gameSource.debug.json) {
        gameSource.debug.json = {};
        created = true;
    }
    
    if (! gameSource.debug.json.constants) {
        gameSource.debug.json.constants = {};
        created = true;
    }

    let debugJSON = nestedGetObject(gameSource.debug.json.constants, name, true, true);
    const gameJSON = nestedGetObject(gameSource.json.constants, name, false, true);

    if (! debugJSON) {
        // Need to create a least part of the path in both the debug JSON and debug constants.
        // Walk it recursively
        
        let key = name;
        let srcParent = gameSource.json.constants;
        let dstParent = gameSource.debug.json.constants;
        let valueParent = gameSource.debug.constants;
        
        let i = key.indexOf('.');
        while (i !== -1) {
            const k = key.substring(0, i);
            const next = dstParent[k];
            if (! next) {
                // Terminal end of pre-existing path, clone from the
                // source from here down
                dstParent[k] = deep_clone(srcParent[k]);
                // Populate the constant value so that controls can look up
                valueParent[k] = evalJSONGameConstant(dstParent[k]);
                break;
            } else {
                // Recurse into next part
                dstParent = next.value;
                srcParent = srcParent[k].value;
                valueParent = valueParent[k];
                key = key.substring(i + 1);
                i = key.indexOf('.');
            }
        }

        // Get the object again
        debugJSON = nestedGetObject(gameSource.debug.json.constants, name, false, true);
        console.assert(debugJSON);
    }

    if (! debugJSON.object) {
        // Copy from the non-debug version
        debugJSON.parent[name] = debugJSON.object = deep_clone(gameJSON.object);
        nestedSet(gameSource.debug.constants, name,
                  (debugJSON.object.type === 'reference')  ?
                  new GlobalReferenceDefinition(name, debugJSON.object) :
                  evalJSONGameConstant(debugJSON.object));
        created = true;
    }

    if (typeof debugJSON.object !== 'object') {
        // Wrap raw constants
        const value = debugJSON.object;
        if (value === undefined || value === null) {
            debugJSON.parent[debugJSON.key] = debugJSON.object = {type: 'nil'};
        } else {
            debugJSON.parent[debugJSON.key] = debugJSON.object = {type: typeof value, value: value};
        }
        created = true;
    }

    const debugPane = document.getElementById('constantEditor_' + name + '_debug_div');
    if (debugPane) {
        if (checkbox.checked) {
            debugPane.classList.remove('disabled');
            debugPane.disabled = false;
        } else {
            debugPane.classList.add('disabled');
            debugPane.disabled = true;
        }
    }

    debugJSON.object.enabled = checkbox.checked;
    
    if (created) {
        // Create the controls dynamically (force it to compact mode, since we
        // don't know whether we are compact or not at this point)

        // Create the value
        
        console.log(name, debugJSON.object, gameSource.debug.constants);
        debugPane.innerHTML =
            `<span class="constantName">${name}</span> =` +
            makeConstantEditorControlHTML(name, debugJSON.object,
                                          nestedGet(gameSource.debug.constants, name), true, true);
    }
    
    serverSaveDebugJSON();

    // if the game is running, update the live constant
    if (emulatorMode !== 'stop') {
        redefineConstantByName(QRuntime, name);
    }
}