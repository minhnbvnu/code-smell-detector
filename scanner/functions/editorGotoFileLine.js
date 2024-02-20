function editorGotoFileLine(url, line, character, highlight) {
    if (character === undefined) { character = 1; }

    let done = false;
    for (let i = 0; i < gameSource.modes.length; ++i) {
        const mode = gameSource.modes[i];
        if (mode.url === url) {
            // Found the mode
            onProjectSelect(document.getElementById('ModeItem_' + mode.name.replace('*', '')), 'mode', mode);
            aceEditor.focus();
            aceEditor.gotoLine(line, character - 1, false);
            done = true;
            break;
        }
    }

    if (! done) {
        // Look in scripts
        const i = gameSource.scripts.indexOf(url);
        if (i !== -1) {
            onProjectSelect(document.getElementById('ScriptItem_' + url), 'script', url);
            aceEditor.focus();
            aceEditor.gotoLine(line, character - 1, false);
        }
    }

    if (highlight) {
        const Range = ace.require('ace/range').Range;
        if (aceEditor.session.errorMarker) { aceEditor.session.removeMarker(aceEditor.session.errorMarker); }
        aceEditor.session.errorMarker = aceEditor.session.addMarker(new Range(line - 1, 0, line - 1, 1), "aceErrorMarker", "fullLine", false);
    }
}