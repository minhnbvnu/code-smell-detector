function onConstantEditorVectorValueChange(gameLayer, environment, controlName, key, fields, event) {
    const json = nestedGet(gameLayer.json.constants, key, false, true);
    console.assert(json !== undefined);

    for (let f = 0; f < fields.length; ++f) {
        const element = fields[f];

        console.assert(json.value[element] !== undefined);

        // Force metadata if not already present
        if (! json.value[element].type) { json.value[element] = {type: 'number', value: undefined}; }

        const value = document.getElementById('constantEditor_' + controlName + '_' + element.replace(/[^a-z0-9_A-Z]/g, '_')).value;
        
        // Update stored value
        json.value[element].value = value;

        if (json.nudge) {
            json.nudge[element] = document.getElementById('constantEditor_' + controlName + '_nudge_' + element.replace(/[^a-z0-9_A-Z]/g, '_')).value;
        }
    }

    const value = evalJSONGameConstant(json);

    const type = json.type;
    const isColor =
          type === 'rgb' || type === 'rgba' ||
          type === 'hsv' || type === 'hsva';
    
    if (isColor) {

        // Update the color preview
        const preview = document.getElementById('constantEditor_' + controlName + '_preview');
        preview.style.background = htmlColor4Bit(value);

        const hex = document.getElementById('constantEditor_' + controlName + '_hex');
        hex.innerHTML = colorToHexString(value);
    }

    if (isColor || type === 'distribution') {
        // Update sliders if editable
        let sum = 0;
        for (let i = 0; i < fields.length; ++i) {
            const field = fields[i];
            const slider = document.getElementById('constantEditor_' + controlName + '_slider_' + field.replace(/[^a-z0-9_A-Z]/g, '_'));
            if (slider) {
                slider.value = value[field] * 1000;
                sum += value[field];
            }
        }

        if (type === 'distribution') {
            // Compute normalized probabilities
            if (sum <= 0 || isNaN(sum) || Math.abs(sum) === Infinity) {
                sum = 1;
            }
            
            for (let i = 0; i < fields.length; ++i) {
                const field = fields[i];
                
                // Update the percentage label
                const percent = value[field] / sum;
                document.getElementById('constantEditor_' + controlName + '_percent_' + field.replace(/[^a-z0-9_A-Z]/g, '_')).innerHTML = QRuntime.format_number(percent, '%');
            }
        } // if distribution
    }

    // Pass down to the generic value change handler
    onConstantEditorValueChange(gameLayer, environment, controlName, key, value, json.value, null);
}