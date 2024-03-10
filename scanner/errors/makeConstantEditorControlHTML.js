function makeConstantEditorControlHTML(constantName, json, value, isDebugLayer, compact) {
    console.assert(json);
    const type = json.type || typeof value;
    const disabled = editableProject ? '' : 'disabled';
    const controlName = (isDebugLayer ? 'debug_' : '') + constantName;

    let html = '';

    if (type === 'string') {        

        const isLarge = value.length > 20 || value.indexOf('\n') !== -1;
        html += `"<textarea ${json.url ? 'disabled' : ''} style="${isLarge ? '' : 'display: inline-block;'} vertical-align:top; margin-left:1px; margin-right:2px;" autocomplete="false" ${disabled} onchange="onConstantEditorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', this.value, this.value)" rows=${isLarge ? 4 : 1} cols=${isLarge ? 40 : 20}>${value}</textarea>"<br>`;

    } else if (value === undefined || value === null) {

        html += '<code>∅</code><br>';
        
    } else if (type === 'number') {

        const numValue = (typeof json === 'number') ? value : json.value;

        // Parse and clean up min and max bounds
        let minVal = json.min !== undefined ? evalJSONGameConstant(json.min) : -Infinity;
        let maxVal = json.max !== undefined ? evalJSONGameConstant(json.max) : Infinity;
        if (typeof minVal !== 'number') { minVal = -Infinity; }
        if (typeof maxVal !== 'number') { maxVal = Infinity; }
        if (minVal > maxVal) { let temp = minVal; minVal = maxVal; maxVal = temp; }
        if (isNaN(minVal)) { minVal = -Infinity; }
        if (isNaN(maxVal)) { maxVal = Infinity; }

        // Parse and clean up quantum
        let quantum = 0;
        if (json.quantum !== undefined) {
            try {
                quantum = evalJSONGameConstant(json.quantum);
            } catch (e) {
                quantum = 0;
            }
        }
        if (quantum < 0 || typeof quantum !== 'number' || isNaN(quantum) || quantum === Infinity || quantum > maxVal - minVal) {
            // Not a useful quantum, force to zero
            quantum = 0;
        }

        // Parse and clean up format
        let format = json.format;
        if (typeof format !== 'string') { format = ''; }

        // Event handler
        const onchange =
              `{ const v = clamp(QRuntime.round($parse(this.value, 0).result, ${quantum}), ${minVal}, ${maxVal}); ` +
              `const f = QRuntime.format_number(v, '${format}'); this.value = f; ` +
              `onConstantEditorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', v, f); ` +
              `const slider = document.getElementById('constantEditor_${controlName}_slider'); ` +

              // The maxVal - minVal will be NaN if one is infinity, but then this code will never execute, either!
              `if (slider) { slider.value = 1000 * (v - ${minVal}) / (${maxVal - minVal}); }}`;
        html += `<input id="constantEditor_${controlName}_textbox" style="width:100px; text-align: right" type="text" onchange="${onchange}" autocomplete="false" ${disabled} value="${numValue}">`;

        // Show a slider
        if (editableProject &&
            (json.type === 'number' || typeof json.value === 'number') &&
            isFinite(minVal) &&
            isFinite(maxVal)) {

            // Create the slider
            const editor = `<input ${compact ? 'class="nudge"' : ''} id="constantEditor_${controlName}_slider" type="range" oninput="onConstantEditorSliderChange('constantEditor_${controlName}_textbox', QRuntime.round(this.value * ${(maxVal - minVal) / 1000} + ${minVal}, ${quantum}), '${format}')" min="0" max="1000" value="${1000 * (value - minVal) / (maxVal - minVal)}"></input>`;
            
            // Insert into the html
            html = `<table style="display: inline-block; vertical-align: middle; border-collapse: collapse"><tr align="top"><td>${html}</td><td>${editor}</td></tr></table><br>`;
        } else {
            html += '<br>';
        }
        
        if (! compact) {
            // Show extra information
            html += '<i>All PyxlScript number formats supported. For example, <code>10, -3, 1.5, 2pi, 90deg, 90°, -∞, π, ½</code></i><br>';
        }
        
    } else if (type === 'boolean') {

        html += `<label><div id="constantEditor_${controlName}_display" class="code" style="display: inline-block; width: 45px; font-size: 100%">${value}</div><input type="checkbox" style="position: relative; top: 2px; left: -3px; margin-right:0.5px" autocomplete="false" onchange="onConstantEditorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', this.checked, this.checked)" ${disabled} ${value ? 'checked' : ''}></label><br>`;

    } else if (type === 'xy' || type === 'xz' || type === 'xyz' ||
               type === 'rgb' || type === 'rgba' ||
               type === 'hsv' || type === 'hsva' ||
               type === 'distribution') {

        const fields = (type === 'distribution') ? safeObjectKeys(json.value) : type;
        const onchange = `onConstantEditorVectorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', ${JSON.stringify(fields).replaceAll('"', "'")}, event)`;

        html += `<table style="margin-left:10px">`;

        for (let i = 0; i < fields.length; ++i) {
            const element = fields[i];
            const elementValue = json.value[element].type ? json.value[element].value : value[element];

            let elementQuote = element;
            if (! elementQuote.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
                // Need quotes
                elementQuote = '"' + elementQuote + '"';
            }
            
            html += `<tr><td>${elementQuote}:</td><td style="white-space: nowrap"><input id="constantEditor_${controlName}_${element.replace(/[^a-z0-9_A-Z]/g, '_')}" onchange="${onchange}" style="width:80px; text-align: right; margin-left: 1px; margin-right: 1px" type="text" autocomplete="false" ${disabled} value="${elementValue}">`;
            html += '</td></tr>';
        }

        html += '</table>';

        // editor is the sliders. metaEditor is a preview (for the color)
        let editor = '', metaEditor = '';

        // Nudge buttons for vectors
        if (editableProject && (type === 'xy' || type === 'xz' || type === 'xyz')) {
            // Position editor
            
            // The arrow characters here must be kept in sync with onConstantEditorVectorNudge
            const buttonParams = ` style="width:18px; height:18px; padding: 0; font-size:10px; font-weight: bold; font-family: sans-serif" onclick="onConstantEditorVectorNudge('constantEditor_${controlName}', '${type}', this.innerText)"`;

            editor += '<table style="border-collapse:collapse" ' + (compact ? 'class="nudge"' : '') + '>';
            
            if (type.length === 3) {
                editor += `<tr valign=top><td></td><td><button ${buttonParams} title="+${type[1]}">↑</button></td><td><button ${buttonParams} title="-z">↗</button></td></tr>` +
                    `<tr><td><button ${buttonParams} title="-x">←</button></td><td></td><td><button ${buttonParams} title="+x">→</button></td></tr>` +
                    `<tr><td><button ${buttonParams} title="+z">↙</button></td><td><button ${buttonParams} title="-${type[1]}">↓</button></td><td></td></tr>`;
            } else {
                editor += `<tr><td rowspan=2><button ${buttonParams} title="-x">←</button></td><td><button ${buttonParams} title="+${type[1]}">↑</button></td><td rowspan=2><button ${buttonParams} title="+x">→</button></td></tr>` +
                    `<tr><td><button ${buttonParams} title="-${type[1]}">↓</button></td></tr>`;
            }

            editor += '</table>';
            
            metaEditor = '<table style="margin-left:10px" ' + (compact ? 'class="nudge"' : '') + '>';
            if (! json.nudge) {
                // Add nudge values if they aren't present.
                json.nudge = {};
                for (let i = 0; i < fields.length; ++i) { json.nudge[fields[i]] = '+1'; }
                if (type[1] === 'y' && ! gameSource.json.y_up) {
                    json.nudge.y = -1;
                }
            }
            
            for (let i = 0; i < fields.length; ++i) {
                const element = fields[i];
                metaEditor += `<tr><td>Δ${element}</td><td><input id="constantEditor_${controlName}_nudge_${element}" type="text" value="${json.nudge[element]}" onchange="${onchange}" style="width:32px; text-align:right"></input></td></tr>`;
            }
            metaEditor += '</table>';
        } else if (type === 'rgb' || type === 'rgba' || type === 'hsv' || type === 'hsva' || type === 'distribution') {
            // Editor with sliders

            if (type !== 'distribution') {
                // Display color
                editor = `<div style="border-radius: 4px; border: 1px solid #000; width: 64px; height: 64px; overflow: hidden" class="checkerboard"><div id="constantEditor_${controlName}_preview" style="background: ${htmlColor4Bit(value)}; width: 64px; height: 64px"></div></div>`;
            }
            
            // Sliders for color channels and distributions
            if (editableProject) {
                // Move the color preview over to make room for the sliders
                metaEditor = editor;

                let sum = 0;
                if (type === 'distribution') {
                    for (let i = 0; i < fields.length; ++i) {
                        sum += value[fields[i]];
                    }
                }
                    
                editor = '<table>';
                for (let i = 0; i < fields.length; ++i) {
                    const element = fields[i];
                    editor += `<tr><td><input id="constantEditor_${controlName}_slider_${element.replace(/[^a-z0-9_A-Z]/g, '_')}" type="range" oninput="onConstantEditorSliderChange('constantEditor_${controlName}_${element.replace(/[^a-z0-9_A-Z]/g, '_')}', this.value / 1000, '${type === 'distribution' ? '0.000' : '0%'}')" min="0" max="1000" value="${1000 * value[element]}"></input></td>`;
                    if (type === 'distribution') {
                        // Add the normalized percentages
                        editor += `<td style="text-align: right"><span id="constantEditor_${controlName}_percent_${element.replace(/[^a-z0-9_A-Z]/g, '_')}">${QRuntime.format_number(value[element] / sum, '%')}</span></td>`;
                    }
                    editor += '</tr>';
                }
                editor += '</table>';
            }

        } // End special case editors

        if (editor !== '') {
            html = '<table style="border-collapse: collapse"><tr valign="middle"><td>' + html + '</td><td style="padding-left: 10px">' + editor + '</td><td>' + metaEditor + '</td></tr></table>';
            if (editableProject && type === 'distribution') {
                html += `<span class="newNestedConstant clickable" style="padding-left:14px" onclick="showNewDistributionKeyDialog('${constantName}')">✜&nbsp;<i>New&nbsp;measure…</i></span><br>`;
            }
        }
        html = '{<br>' + html + '}';

        if (type === 'rgb' || type === 'rgba' || type === 'hsv' || type === 'hsva') {
            html += ` // <code style="font-size: 120%" id="constantEditor_${controlName}_hex">${colorToHexString(value)}</code>`;
        }
        html += '<br>';
        
    } else if (type === 'reference') {
        
        html += `<div class="select-editable"><select onchange="this.nextElementSibling.value=this.value; onConstantEditorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', this.value, this.value)"><option value=""></option>`;

        // Make sorted lists of all constants followed by all assets
        let sources = gameSource.json.constants;
        for (let j = 0; j < 2; ++j) {
            let list = [];
            for (let key in sources) {
                if (key !== constantName) {
                    list.push(key);
                }
            }
            
            list.sort();
            
            for (let i = 0; i < list.length; ++i) {
                const key = list[i];
                html += `<option value="${key}" ${key === json.value ? 'selected="selected"' : ''}>${key}</option>`;
            }
            
            sources = gameSource.json.assets;
        }

        html += `</select><input type="text" onchange="combobox_textbox_onchange(this); onConstantEditorValueChange(${isDebugLayer ? 'gameSource.debug' : 'gameSource'}, QRuntime, '${controlName}', '${constantName}', this.value, this.value)" value="${json.value}" /></div><br>`;
        
    } else if (json.type === 'table') {
        
        // Object or array (including built-in objects)
        const s = QRuntime.unparse(value);
        if (s.length > 16) {
            html += '<table>' + visualizeConstant(value, '') + '</table>';
        } else {
            html += escapeHTMLEntities(s);
        }
        
    } else {
        
        // Object or array (including built-in objects)
        const isArray = type === 'array' || Array.isArray(value);
        html += '<code>' + (isArray && ! json.url ? '[' : '{') + '</code>';
        html += '<div style="margin-left:15px">';

        if (json.url) {
            // Raw constant
            html += `url: ${json.url}`;
        } else {
            const keyArray = Object.keys(value);
            for (let k = 0; k < keyArray.length; ++k) {
                const key = keyArray[k];
                
                // Recursively generate the child editor
                const childIsContainer = json.value[key].type === 'array' || json.value[key].type === 'object';

                let keyQuote = key;
                if (! keyQuote.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
                    // Need quotes
                    keyQuote = '"' + keyQuote + '"';
                }

                html += `<div class="${childIsContainer ? 'containerConstantEditor' : 'oneConstantEditor'}"><span class="constantName">${keyQuote}</span>:` +
                    makeConstantEditorControlHTML(
                        constantName + '.' + key.replace(/[^0-9a-zA-Z_]/g, '_'),
                        json.value[key],
                        value[key],
                        isDebugLayer,
                        true) + '</div>';
            }

            if (editableProject) {
                html += `<span class="newNestedConstant clickable" onclick="showNewConstantDialog('${constantName}')">✜&nbsp;<i>New&nbsp;${isArray ? 'value' : 'key'}…</i></span>`;
            }
        }
        html += '</div><code>' + (isArray && ! json.url ? ']' : '}') + '</code>';
    }

    const isContainer = json.type === 'array' || json.type === 'object';
    const editableConstant = editableProject && ! isContainer;
        
    if (editableConstant && ! isDebugLayer) {
        const indent = 0;
        const debugJSON = (gameSource.debug.json && gameSource.debug.json.constants) ? nestedGet(gameSource.debug.json.constants, constantName, true, true) : undefined
        const debugEnabled = debugJSON && debugJSON.enabled;
        
        html += `<input type="checkbox" style="margin-left:${indent + 1}px; position: relative; top: 2px" autocomplete="false" ${debugEnabled ? 'checked' : ''} onchange="onConstantEditorDebugOverrideChange(gameSource, '${constantName}', this)" class="${compact ? 'debugOverrideCheckbox' : ''}"><label style="color:#bbb" class="${compact ? 'debugOverrideCheckbox' : ''}">Debug&nbsp;Override</label>`;
        html += `<div class="debugOverride ${debugEnabled ? '' : 'disabled'}" id="constantEditor_${controlName}_debug_div" ${debugEnabled ? '' : 'disabled'} style="margin-left:${indent - 3}px">`;
        
        if (gameSource.debug.constants) {
            const debugValue = nestedGet(gameSource.debug.constants, constantName, true);
            
            if (debugValue !== undefined) {
                // Debug editor for a value already defined in the .debug.json. If the value does
                // not exist or the debug.json does not, then they will be created an inserted
                // on the first enabling of debugging for this constant.
                if (debugValue.type !== undefined) {
                    // Not a raw value
                    debugValue = debugValue.value;
                }
                html += makeConstantEditorControlHTML(constantName, nestedGet(gameSource.debug.json.constants, constantName, false, true), debugValue, true, compact);
            }
        }

        // End of debug div
        html += '</div><br>';
    } // Debug override
    
    return html;
}