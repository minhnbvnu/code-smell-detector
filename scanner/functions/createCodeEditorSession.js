function createCodeEditorSession(url, bodyText, assetName) {
    console.assert(url);
    console.assert(! codeEditorSessionMap.has(url));
    if (typeof bodyText === 'undefined' || typeof bodyText === 'null') {
        bodyText = '\n';
    } else if (typeof bodyText !== 'string') {
        bodyText = WorkJSON.stringify(bodyText, undefined, 4);
    }
    const session = new ace.EditSession(bodyText);

    const readOnly = isRemote(url) || isBuiltIn(url);
    codeEditorSessionMap.set(url, session);
    if (! readOnly) {
        session.setUndoManager(new ace.UndoManager());
    }

    console.assert(! url.endsWith('.sprite.json') || assetName !== undefined,
                   'Undefined asset name for ' + url);
    // Extra quadplay data
    session.aux = {
        url: url,
        
        // Increments on change
        epoch: 0,

        // Undefined for non-assets
        assetName: assetName,
        
        mode: 'All changes saved.',

        saveTimeoutID: null,

        // Lock all built-in content
        readOnly: readOnly,

        fileType: url.replace(/^.+\.([A-Za-z0-9]+)$/, '$1')
    };
    
    session.setUseSoftTabs(true);
    session.setTabSize(4);
    session.setUseWrapMode(false);
    session.setUseWorker(false);

    if (url.endsWith('.yaml')) {
        session.setMode('ace/mode/yaml');
    } else if (url.endsWith('.md.html') || url.endsWith('.md')) {
        session.setMode('ace/mode/markdown');
    } else if (url.endsWith('.json')) {
        session.setMode('ace/mode/json');
    } else if (url.endsWith('.html')) {
        session.setMode('ace/mode/html');
    } else if (url.endsWith('.pyxl')) {
        session.setMode('ace/mode/pyxlscript');
    }
    
    if (! session.aux.readOnly) {
        const delaySeconds = session.aux.fileType === 'json' ? ASSET_EDITOR_SAVE_DELAY_SECONDS : CODE_EDITOR_SAVE_DELAY_SECONDS;
        
        // onchange handler
        session.on('change', function (delta) {
            if (session.aux.ignoreChange) {
                // Programmatic update using setValue, not a change
                // due to the user. Do not try to save or autocorrect.
                return;
            }

            if (session.aux.readOnly) { return; }

            if (session.errorMarker) { session.removeMarker(session.errorMarker); }

            // Remove this object from the cache (if present)
            delete assetCache[session.aux.url];

            // This is code to detect programmatic changes to the value, but it
            // can't distinguish search-and-replace from other
            // code changes, so not a good idea.
            // if (! aceEditor.curOp || ! aceEditor.curOp.command.name) { return; }

            if ((session.aux.fileType === 'pyxl') && document.getElementById('automathEnabled').checked) {
                autocorrectSession(session);
            }
            
            // Cancel the previous pending timeout if there is one
            if (session.aux.saveTimeoutID) {
                --savesPending;
                clearTimeout(session.aux.saveTimeoutID);
                removePendingSaveCallback(session.aux.saveCallback);
            }
            
            // Note that the epoch has changed
            ++session.aux.epoch;
            const myEpoch = session.aux.epoch;
            setCodeEditorSessionMode(session, 'Modified<span class="blink">...</span>');

            ++savesPending;
            session.aux.saveCallback = function () {
                // Remove the callback
                removePendingSaveCallback(session.aux.saveCallback);
                // Clear the timeout in case this function was explicitly invoked
                clearTimeout(session.aux.saveTimeoutID);
                session.aux.saveTimeoutID = null;
                session.aux.saveCallback = null;
                
                if (myEpoch === session.aux.epoch) {
                    // Epoch has not changed since timeout was created, so begin the POST
                    setCodeEditorSessionMode(session, 'Saving<span class="blink">...</span>');

                    // Update the file contents immediately
                    let contents = session.getValue();
                    fileContents[url] = contents;

                    // Test whether the JSON file can successfully
                    // parse before trying to reload. This will not
                    // stop the save either way.
                    let parseOK = true;
                    if (url.endsWith('.json')) {
                        try {
                            parseOK = false;
                            WorkJSON.parse(contents);
                            parseOK = true;
                        } catch (e) {
                            console.log('Saved but did not reload ' + url + ' because it cannot parse correctly in the current state.');
                        }
                    }

                    // If this is present in a cache, delete it
                    delete assetCache[url];

                    const filename = urlToLocalWebPath(url);
                    serverWriteFile(filename, 'utf8', contents, function () {

                        // If JSON, see if the current contents can
                        // parse before trying to reload anything
                        if (session.aux.fileType !== 'json' || parseOK) {
                            if (session.aux.fileType !== 'json' && session.aux.fileType !== 'pyxl') {
                                // This must be a doc; update the preview pane, preserving
                                // the scroll position if possible.
                                showGameDoc(url, true);
                            } else if (url.endsWith('.sprite.json')) {
                                // Reload the game to pick up the new sprite, and then
                                // reselect
                                loadGameIntoIDE(window.gameURL, function () {
                                    // (for a spritesheet in a map, it has a dot in it)
                                    const assetName = session.aux.assetName;

                                    let spritesheet;
                                    if (assetName.indexOf('.') !== -1) {
                                        // Spritesheet within a map
                                        const map = gameSource.assets[assetName.replace(/\..*$/, '')];
                                        const spritesheetName = assetName.replace(/^.*\./, '');
                                        if (spritesheetName === 'spritesheet') {
                                            spritesheet = map.spritesheet;
                                        } else {
                                            spritesheet = map.spritesheet_table[spritesheetName];
                                        }
                                        console.assert(spritesheet);
                                    } else {
                                        spritesheet = gameSource.assets[assetName];
                                        console.assert(spritesheet);
                                    }
                                    onProjectSelect(document.getElementById('projectAsset_' + assetName), 'asset', spritesheet);
                                }, true);
                                
                            } else if (url.endsWith('.game.json')) {
                                const RELOAD_FAST = true;
                                // Avoid cursor jumps
                                const NO_UPDATE_EDITORS = true;
                                
                                // Reload the game
                                loadGameIntoIDE(window.gameURL, function () {
                                    // Update the IDE view
                                    visualizeGame(document.getElementById('gameEditor'), url, gameSource.json)
                                }, RELOAD_FAST, NO_UPDATE_EDITORS);
                            }
                        }
                        
                        --savesPending;
                        if (myEpoch === session.aux.epoch) {
                            // Only change mode if nothing has changed
                            setCodeEditorSessionMode(session, 'All changes saved.');
                        }
                    }, function () {
                        // Error case
                        --savesPending;
                    });
                } else {
                    // Epoch failed
                    --savesPending;
                }
            };

            pendingSaveCallbacks.push(session.aux.saveCallback);

            session.aux.saveTimeoutID = setTimeout(session.aux.saveCallback, delaySeconds * 1000);
        });
    }
    
    return session;
}