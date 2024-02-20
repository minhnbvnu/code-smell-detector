function onNewConstantCreate(parentKey) {
    hideNewConstantDialog();

    let key = document.getElementById('newConstantName').value;

    // May be empty if appending to an array
    if (key === '') {
        console.assert(parentKey);
        key = nestedGet(gameSource.constants, parentKey).length;
    }
    
    if ((nestedGet(gameSource.constants, (parentKey ? parentKey + '.' : '') + key, true) !== undefined) &&
        ! window.confirm('There is already a constant named ' +
                         key.replaceAll(/\.[0-9]+(?=\.)/g, function (match) { return '[' + match.substring(1) + ']';}) +
                         '. Replace it?')) {
        return;
    }
    
    const type = document.querySelector('input[name="newConstantType"]:checked').value;

    let value = {
        string:  '',
        boolean: true,
        nil:     undefined,
        number:  0,
        xy:      {x: {type: 'number', value: 0},
                  y: {type: 'number', value: 0}},
        xz:      {x: {type: 'number', value: 0},
                  z: {type: 'number', value: 0}},
        xyz:     {x: {type: 'number', value: 0},
                  y: {type: 'number', value: 0},
                  z: {type: 'number', value: 0}},
        rgb:     {r: {type: 'number', value: '100%'},
                  g: {type: 'number', value: '100%'},
                  b: {type: 'number', value: '100%'}},
        rgba:    {r: {type: 'number', value: '100%'},
                  g: {type: 'number', value: '100%'},
                  b: {type: 'number', value: '100%'},
                  a: {type: 'number', value: '100%'}},
        hsv:     {h: {type: 'number', value: '0%'},
                  s: {type: 'number', value: '100%'},
                  v: {type: 'number', value: '100%'}},
        hsva:    {h: {type: 'number', value: '0%'},
                  s: {type: 'number', value: '100%'},
                  v: {type: 'number', value: '100%'},
                  a: {type: 'number', value: '100%'}},
        distribution: {},
        object:  {},
        array:   []
    }[type];

    // Make the reference to *something* valid
    if (type === 'reference') {
        const keyArray = Object.keys(gameSource.json.constants);
        if (keyArray.length > 0) {
            value = keyArray[0];
        } else {
            const keyArray = Object.keys(gameSource.json.assets);
            if (keyArray.length > 0) {
                value = keyArray[0];
            } else {
                // Circular self reference because no other name is valid!
                value = key;
            }
        }
    }

    const obj = {type: type, value: value};
    const description = document.getElementById('newConstantDescription').value;
    if (description !== '') {
        obj.description = description;
    }

    if (type === 'number') {
        const minValText = document.getElementById('newConstantNumberMin').value.trim();
        const maxValText = document.getElementById('newConstantNumberMax').value.trim();
        
        let minVal = $parse(minValText).result;
        let maxVal = $parse(maxValText).result;

        // Legal and nontrivial
        if (! isNaN(minVal) && typeof minVal === 'number' &&
            ! isNaN(maxVal) && typeof maxVal === 'number' &&
            (Math.max(minVal, maxVal) < Infinity || Math.min(minVal, maxVal) > -Infinity)) {

            // Sort
            if (maxVal < minVal) { const temp = minVal; minVal = maxVal; maxVal = temp; }

            // Clamp the initial value to the specified range
            obj.value = value = clamp(obj.value, minVal, maxVal);

            // Save minVal
            if (/^[+\-0-9.]+$/.test(minValText)) {
                obj.min = minVal;
            } else {
                obj.min = {type: 'number', value: minValText};
            }

            // Save maxVal
            if (/^[+\-0-9.]+$/.test(maxValText)) {
                obj.max = maxVal;
            } else {
                obj.max = {type: 'number', value: maxValText};
            }
        } // if min and max val are well formed and not the full range

        const formatText = document.getElementById('newConstantNumberFormat').value.trim();
        const quantumText = document.getElementById('newConstantNumberQuantum').value.trimEnd();
        // Make these discoverable by
        // adding them to the saved object
        obj.format = "";
        if (/^[+\-0-9.]+$/.test(quantumText)) {
            obj.quantum = $parse(quantumText).result;
        } else {
            obj.quantum = {type: 'number', value: quantumText};
        }

        obj.format = formatText;

    } // if number

    if (! gameSource.json.constants) {
        gameSource.json.constants = {};
    }
    
    if (parentKey) {
        nestedGet(gameSource.constants, parentKey)[key] = value;
        nestedGet(gameSource.json.constants, parentKey, false, true).value[key] = obj;
    } else {
        gameSource.constants[key] = value;
        gameSource.json.constants[key] = obj;
    }

    // Reload
    serverSaveGameJSON(function () {
        loadGameIntoIDE(window.gameURL, function () {
            const k = parentKey ? parentKey.replace(/\..+/, '') : key;
                
            // Select the new constant
            onProjectSelect(document.getElementById('projectConstant_' + k), 'constant', k);
        }, true);
    });
}