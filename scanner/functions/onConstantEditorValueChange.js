function onConstantEditorValueChange(gameLayer, environment, controlName, key, value, jsonValue) {

    console.assert(gameLayer.json);
    const k = nestedGetObject(gameLayer.json.constants, key, false, true);
    
    // Update gameLayer.json.constants
    if (typeof k.object === 'object') {
        // The target already has metadata, just write to the value field
        console.assert(k.object.type !== 'raw');
        k.object.value = jsonValue;
    } else {
        // The target was a raw value. Create metadata.
        switch (typeof value) {
        case 'number':
        case 'string':
        case 'boolean':
            k.parent[k.key] = k.object = {type: typeof value, value: jsonValue};
            break;
            
        case 'object':
            console.assert(value === null);
            // Fall through
        case 'undefined':
            k.parent[k.key] = k.object = {type: 'nil'};
            break;

        default:
            console.assert(false, 'Should not get here');
            // A more complex object
            //obj.value = jsonValue;
            break;
        }
    }
    
    if (typeof value === 'boolean') {
        document.getElementById(`constantEditor_${controlName}_display`).innerHTML = '' + value;
    }
    
    // Update pre-evaluated objects
    if (k.object.type === 'reference') {
        nestedSet(gameLayer.constants, key, new GlobalReferenceDefinition(key, k.object));
    } else {
        nestedSet(gameLayer.constants, key, value);
    }
    
    // Set a timer to save the game.json
    if (gameLayer === gameSource) {
        serverScheduleSaveGameJSON(CONSTANT_EDITOR_SAVE_DELAY);
    } else if (gameLayer === gameSource.debug) {
        // There is no save delay implemented for the debug layer currently
        serverSaveDebugJSON();
    }
    
    // if the game is running, update the live constant
    if (emulatorMode !== 'stop') {
        redefineConstantByName(environment, key);
    }
}