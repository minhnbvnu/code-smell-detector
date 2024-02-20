function visualizeGame(gameEditor, url, game) {
    console.assert(url, 'undefined url');

    const disabled = editableProject ? '' : 'disabled';
    let s = '';

    if (! editableProject) {
        // Why isn't this project editable?
        const reasons = [];

        if (! locallyHosted()) {
            reasons.push('is hosted on a remote server');
        } else if (! isQuadserver) {
            reasons.push('is not running locally with the <code>quadplay</code> script');
        }

        if (! useIDE) {
            reasons.push('was launched without the IDE');
        }

        // Is built-in
        if (isBuiltIn(gameURL)) {
            reasons.push('is a built-in example');
        }
        
        s += '<i>This project is locked because it';
        if (reasons.length > 1) {
            // Many reasons
            s += '<ol>\n';
            for (let i = 0; i < reasons.length; ++i) {
                s += '<li>' + reasons[i] + '</li>\n';
            }
            s += '<ol>\n';
        } else {
            // One reason
            s += ' ' + reasons[0] + '.';
        }
        s += '</i><br><br>\n';
    }

    s += '<table>\n';
    s += '<tr valign="top"><td>Path</td><td colspan=3>' + url + '</td></tr>\n';

    if (editableProject) {
        const filename = serverConfig.rootPath + urlToLocalWebPath(url);
        // The second regexp removes the leading slash on windows
        let path = filename.replace(/\/[^.\/\\]+?\.game\.json$/, '').replace(/^\/([a-zA-Z]:\/)/, '$1');
        if (path.length > 0 && path[path.length - 1] !== '/') { path += '/'; }
        s += `<tr valign="top"><td>Folder</td><td colspan=3><a onclick="onOpenFolder('${path}')" style="cursor:pointer">${path}</a></td></tr>\n`;
    }
    
    s += `<tr valign="top"><td width="110px">Title</td><td colspan=3><input type="text" autocomplete="false" style="width:384px" ${disabled} onchange="onProjectMetadataChanged()" id="projectTitle" value="${(game.title || '').replace(/"/g, '\\"')}"></td></tr>\n`;
    s += `<tr valign="top"><td>Developer</td><td colspan=3><input type="text" autocomplete="false" style="width:384px" ${disabled} onchange="onProjectMetadataChanged()" id="projectDeveloper" value="${(game.developer || '').replace(/"/g, '\\"')}"></td></tr>\n`;
    s += `<tr valign="top"><td>Copyright</td><td colspan=3><input type="text" autocomplete="false" style="width:384px" ${disabled} onchange="onProjectMetadataChanged()" id="projectCopyright" value="${(game.copyright || '').replace(/"/g, '\\"')}"></td></tr>\n`;
    s += `<tr valign="top"><td>License</td><td colspan=3><textarea ${disabled} style="width:384px; padding: 3px; margin-bottom:-3px; font-family: Helvetica, Arial; font-size:12px" rows=2 id="projectLicense" onchange="onProjectMetadataChanged(this)">${game.license}</textarea>`;
    if (editableProject) {
        // License defaults
        s += '<br><button class="license" onclick="onProjectLicensePreset(\'All\')">All Rights Reserved</button><button class="license" onclick="onProjectLicensePreset(\'GPL\')">GPL 3</button><button onclick="onProjectLicensePreset(\'BSD\')" class="license">BSD</button><button class="license" onclick="onProjectLicensePreset(\'MIT\')">MIT</button><button onclick="onProjectLicensePreset(\'CC0\')" class="license">Public Domain</button>';
    }
    s += '</td></tr>\n';

    s+= '<tr><td>&nbsp;</td></tr>\n';
    if (editableProject) {
        s += '<tr valign="top"><td>Start&nbsp;Mode</td><td colspan=3><select id="projectstartmodedropdown" style="width:390px" onchange="onProjectInitialModeChange(this.value)">\n';
        for (let i = 0; i < gameSource.modes.length; ++i) {
            const mode = gameSource.modes[i];
            if (! mode.name.startsWith('quad://console/os/_') && ! mode.name.startsWith('$')) {
                s += `<option value=${mode.name} ${mode.name === gameSource.json.start_mode ? 'selected' : ''}>${mode.name}</option>\n`;
            }
        }
        s += '</select></td></tr>\n';

        const overrideInitialMode = gameSource.debug && gameSource.debug.json && gameSource.debug.json.start_mode_enabled && gameSource.debug.json.start_mode;
        s += `<tr valign="top"><td></td><td><label><input id="projectdebugstartmodeoverridecheckbox" type="checkbox" autocomplete="false" style="margin-left:0" ${overrideInitialMode ? 'checked' : ''} onchange="onDebugInitialModeOverrideChange(this)">Debug&nbsp;Override</label></td><td colspan=2"><select id="debugOverrideInitialMode" style="width:205px; top:-2px" ${overrideInitialMode ? '' : 'disabled'} onchange="onProjectDebugInitialModeChange(this.value)">\n`;
        for (let i = 0; i < gameSource.modes.length; ++i) {
            const mode = gameSource.modes[i];
            if (! mode.name.startsWith('quad://console/os/_') && ! mode.name.startsWith('$')) {
                s += `<option value=${mode.name} ${(gameSource.debug.json && (mode.name === gameSource.debug.json.start_mode)) ? 'selected' : ''}>${mode.name}</option>\n`;
            }
        }
        s += '</select></td></tr>\n';
        
        s += `<tr valign="top"><td>Screen&nbsp;Size</td><td colspan=3><select id="projectscreensizedropdown" style="width:390px" onchange="onProjectScreenSizeChange(this)">`;
        for (let i = 0; i < allowedScreenSizes.length; ++i) {
            const W = allowedScreenSizes[i].x, H = allowedScreenSizes[i].y;
            s += `<option value='{"x":${W},"y":${H}}' ${W === gameSource.extendedJSON.screen_size.x && H === gameSource.extendedJSON.screen_size.y ? "selected" : ""}>${W} × ${H}${W === 384 && H === 224 ? ' ✜' : ''}</option>`;
        }
        s += `</select></td></tr>\n`;
    } else {
        // The disabled select box is too hard to read, so revert to a text box when not editable
        for (let i = 0; i < gameSource.modes.length; ++i) {
            const mode = gameSource.modes[i];
            if (! mode.name.startsWith('quad://console/os/_') && (mode.name === gameSource.json.start_mode)) {
                s += `<tr valign="top"><td>Initial&nbsp;Mode</td><td colspan=3><input type="text" autocomplete="false" style="width:384px" ${disabled} value="${mode.name.replace(/\*/g, '')}"></td></tr>\n`;
                break;
            }
        }
        s += `<tr valign="top"><td>Screen&nbsp;Size</td><td colspan=3><input id="projectscreensizetextbox" type="text" autocomplete="false" style="width:384px" ${disabled} value="${gameSource.extendedJSON.screen_size.x} × ${gameSource.extendedJSON.screen_size.y}"></td></tr>\n`;
    }
    s += `<tr valign="top"><td></td><td colspan=3><label><input id="projectyupcheckbox" type="checkbox" autocomplete="false" style="margin-left:0" ${disabled} ${game.y_up ? 'checked' : ''} onchange="onProjectYUpChange(this)">Y-Axis = Up</label></td></tr>\n`;

    s += '<tr><td>&nbsp;</td></tr>\n';
    s += `<tr valign="top"><td>I/O</td><td colspan=4><label><input id="projectdualdpadcheckbox" type="checkbox" autocomplete="false" style="margin-left:0" ${disabled} ${game.dual_dpad ? 'checked' : ''} onchange="onProjectDualDPadChange(this)">Dual D-Pad</label>  <label><input id="projectmidicheckbox" type="checkbox" autocomplete=false ${disabled} ${game.midi_sysex ? 'checked' : ''} onchange="onProjectMIDISysexChange(this)" style="margin-left: 50px" tooltip="Does this game send MIDI sysex messages?">MIDI Sysex Output</label></td></tr>\n`;
    s += '<tr><td>&nbsp;</td></tr>\n';
    
    s += `<tr valign="top"><td>Description<br><span id="projectDescriptionLength">(${(game.description || '').length}/100 chars)</span> </td><td colspan=3><textarea ${disabled} style="width:384px; padding: 3px; margin-bottom:-3px; font-family: Helvetica, Arial; font-size:12px" rows=2 id="projectDescription" onchange="onProjectMetadataChanged(this)" oninput="document.getElementById('projectDescriptionLength').innerHTML = '(' + this.value.length + '/100 chars)'">${game.description || ''}</textarea>`;
    s += '<tr valign="top"><td>Features</td><td colspan=3>';
    const boolFields = ['Cooperative', 'Competitive', 'High Scores', 'Achievements'];
    for (let f = 0; f < boolFields.length; ++f) {
        const name = boolFields[f];
        const field = name.replace(/ /g,'').toLowerCase();
        s += `<label><input ${disabled} type="checkbox" id="project${capitalize(field)}" onchange="onProjectMetadataChanged(this)" ${game[field] ? 'checked' : ''}>${name}</label> `;
    }
    s += '</td></tr>\n';
    s += `<tr><td></td><td><input type="number" min="1" max="8" ${disabled} onchange="onProjectMetadataChanged(this)" id="projectMinPlayers" value="${game.min_players || 1}"></input> - <input type="number" min="1" max="8" ${disabled} onchange="onProjectMetadataChanged(this)" id="projectMaxPlayers" value=${game.max_players || 1}></input> Players</td></tr>\n`;
    s += '<tr><td>&nbsp;</td></tr>\n';

    s += `<tr valign="top"><td>Screenshot&nbsp;Tag</td><td colspan=3><input type="text" autocomplete="false" style="width:384px" ${disabled} onchange="onProjectMetadataChanged()" id="screenshotTag" value="${game.screenshot_tag.replace(/"/g, '\\"')}"></td></tr>\n`;
    if (editableProject) {
        const overrideTag = gameSource.debug.json && gameSource.debug.json.screenshot_tag_enabled;
        s += `<tr><td></td><td><label><input id="projectscreenshottag" type="checkbox" autocomplete="false" style="margin-left:0" ${overrideTag ? 'checked' : ''} onchange="onDebugScreenshotTagOverrideChange(this)">Debug&nbsp;Override</label></td><td colspan=2><input type="text" autocomplete="false" style="width:198px" ${overrideTag ? '' : 'disabled'} ${disabled} onchange="onProjectMetadataChanged()" id="debugScreenshotTag" value="${(game.debug && game.debug.json && game.debug.json.screenshot_tag !== undefined) ? game.debug.json.screenshot_tag.replace(/"/g, '\\"') : ''}"></td></tr>`;
    }
    s += '<tr><td>&nbsp;</td></tr>\n';
        
    
    const baseURL = url.replace(/\/[^\/]*$/, '');
    s += '<tr valign="top">';
    s += '<td>Label&nbsp;Icons</td><td style="text-align:left">128px&nbsp;&times;&nbsp;128px<br><img alt="label128.png" src="' + baseURL + '/label128.png?" style="border:1px solid #fff; image-rendering: crisp-edges; image-rendering: pixelated; width:128px; height:128px"></td>';
    s += '<td></td><td style="text-align:left">64px&nbsp;&times;&nbsp;64px<br><img alt="label64.png" src="' + baseURL + '/label64.png?" style="border:1px solid #fff; image-rendering: crisp-edges; image-rendering: pixelated; width:64px; height:64px"></td>';
    s += '</tr>\n<tr><td></td><td colspan=3><i>Press Shift+F6 in game to capture <code>label64.png</code> and <code>label128.png</code> templates. Press shift+f8 to capture the <code>preview.png</code> animation.</i></td></tr><tr><td><br/><br/></td></tr>\n';
    s += '</table>';
    gameEditor.innerHTML = s;
}