    function processGameJSON(gameJSON) {
        if (! Array.isArray(gameJSON.modes)) { throw new Error('The modes parameter is not an array'); }
        if (gameJSON.assets === undefined) { gameJSON.assets = {}; }
        if (typeof gameJSON.assets !== 'object') { throw 'The assets parameter is not an object in ' + gameURL; }

        for (const assetName in gameJSON.assets) {
            if (assetName[0] === '$') { throw 'Illegal asset name: "' + assetName + '"'; }
        }

        gameSource.json = gameJSON;

        //////////////////////////////////////////////////////////////////////////////////////////////

        // Fix legacy files that use a * to denote the start mode
        if (! gameJSON.start_mode) {
            for (let i = 0; i < gameJSON.modes.length; ++i) {
                if (gameJSON.modes[i].indexOf('*') !== -1) {
                    console.log('WARNING: Legacy start mode upgraded on load');
                    gameJSON.start_mode = gameJSON.modes[i] = gameJSON.modes[i].replace('*', '');
                }
            }
        }

        // Upgrade
        if (gameJSON.screenshot_tag === undefined) {
            gameJSON.screenshot_tag = gameJSON.title;
        }
       
        // Clone for the extended version actually loaded
        gameJSON = deep_clone(gameJSON);
        gameSource.extendedJSON = gameJSON;

        // Inject launcherGameArray constant and assets if this is the launcher
        if (isLauncher) {
            gameJSON.constants.game_array = {type: 'raw', value: launcherGameArray};
            
            for (let i = 0; i < launcherGameArray.length; ++i) {
                const asset_prefix = 'a' + i;
                const g = launcherGameArray[i];
                g.asset_prefix = asset_prefix;

                // Add assets
                gameJSON.assets[asset_prefix + '_preview'] = g.url + 'preview.png';
                gameJSON.assets[asset_prefix + '_label'] = g.url + 'label64.png';
            }
        } // if isLauncher

        // TODO: Make sure that reloading the kiosk doesn't add
        // this twice if the JSON was cached

        if (! gameJSON.scripts) { gameJSON.scripts = []; }
        if (! gameJSON.modes) { gameJSON.modess = []; }
        
        // Inject OS support
        gameJSON.scripts.push(
            'quad://console/os/_ui.pyxl'
        );
        gameJSON.modes.push(
            'quad://console/os/_SystemMenu',
            'quad://console/os/_ConfirmDialog',
            'quad://console/os/_GameCredits',
            'quad://console/os/_SetControls',
            'quad://console/os/_ControlsMenu',
            'quad://console/os/_ControllerOrder',
            'quad://console/os/_NewHost',
            'quad://console/os/_OnlineMenu'
        );

        // Any changes here must also be updated in the os_dependencies variable in tools/export.py
        gameJSON.assets = Object.assign(gameJSON.assets, os_dependencies);
        //////////////////////////////////////////////////////////////////////////////////////////////

        gameSource.jsonURL = gameURL;
        if (gameJSON.screen_size === undefined) {
            gameJSON.screen_size = {x: 384, y:224};
        }

        {
            let ok = false;
            for (let i = 0; i < allowedScreenSizes.length; ++i) {
                if ((allowedScreenSizes[i].x === gameJSON.screen_size.x) &&
                    (allowedScreenSizes[i].y === gameJSON.screen_size.y)) {
                    ok = true;
                }
            }
            if (! ok) {
                throw new Error(`${gameJSON.screen_size.x} x ${gameJSON.screen_size.y} is not a supported screen size.`);
            }
        }

        // Scripts:
        gameSource.scripts = [];
        if (gameJSON.scripts) {
            
            if (! Array.isArray(gameJSON.scripts)) {
                throw new Error('The scripts parameter is not an array in ' + gameURL);
            }
            
            for (let i = 0; i < gameJSON.scripts.length; ++i) {
                if (typeof gameJSON.scripts[i] !== 'string') {
                    throw new Error('Script ' + i + ' is not a url.');
                }
                
                const scriptURL = makeURLAbsolute(gameURL, gameJSON.scripts[i]);
                gameSource.scripts.push(scriptURL);
                
                loadManager.fetch(scriptURL, 'text', null, function (scriptText) {
                    scriptText = scriptText.replace(/\r/g, '');

                    // Ignore debug files
                    if (! isDebugUrl(scriptURL)) {
                        addCodeToSourceStats(scriptText, scriptURL);
                    }
                    
                    fileContents[scriptURL] = scriptText;
                }, null, null, computeForceReloadFlag(scriptURL));
            }
        }

        // Modes:
        {
            gameSource.modes = [];
            let numStartModes = 0;
            for (let i = 0; i < gameJSON.modes.length; ++i) {
                const modeURL = makeURLAbsolute(gameURL, gameJSON.modes[i] + '.pyxl');
                // Remove any URL prefix and change leading underscore to $ on the name
                // (we don't use $ in the actual URL because it confuses a lot of shells)
                const name = gameJSON.modes[i].replace(/^.*\//, '').replace(/(^|\/)_([^\/]+)$/, '$1$$$2');
                if (name === gameJSON.start_mode) {
                    ++numStartModes;
                }

                // Remove the quad://... from internal modes
                gameSource.modes.push({name: name, url: modeURL});                
            }

            if (numStartModes === 0) {
                throw new Error('No "start_mode" specified');
            }

            // Load all modes
            for (let i = 0; i < gameSource.modes.length; ++i) {
                const mode = gameSource.modes[i];
                loadManager.fetch(mode.url, 'text', null, function (modeCode) {
                    modeCode = modeCode.replace(/\r/g, '');
                    if (! isDebugUrl(mode.url)) {
                        addCodeToSourceStats(modeCode, mode.url);
                    }
                    fileContents[mode.url] = modeCode;
                }, null, null, true);// Always force reload computeForceReloadFlag(mode.url));
            }
        }

        // Assets (processed before constants to allow references to point to them)
        if (gameJSON.assets) {
            gameSource.assets = {};
            
            // Sort assets alphabetically
            const keys = Object.keys(gameJSON.assets);
            keys.sort();
            for (let i = 0; i < keys.length; ++i) {
                const a = keys[i];
                
                // Capture values for the function below
                const assetURL = makeURLAbsolute(gameURL, gameJSON.assets[a]);
                const assetName = a;

                const isIndexingSprite =
                    assetURL.endsWith('preview.png') ||
                    assetURL.endsWith('label64.png') ||
                    assetURL.endsWith('label128.png');
                
                if (isIndexingSprite) {
                    
                    // Special spritesheet assets used for the
                    // launcher that do not have supporting JSON
                    // files. Synthesize a JSON file for them dynamically

                    const json = {
                        url: assetURL,
                        sprite_size: assetURL.endsWith('preview.png') ? {x: 192, y: 112} : assetURL.endsWith('label128.png') ? {x: 128, y: 128} : {x: 64, y: 64}
                    };
                    
                    gameSource.assets[assetName] = loadSpritesheet(assetName, json, assetURL, null);
                    
                } else {
                
                    let type = assetURL.match(/\.([^.]+)\.json$/i);
                    if (type) { type = type[1].toLowerCase(); }
                    
                    // Always re-fetch and parse the json, even though
                    // this asset may be in the cache if it is a built-in
                    // or duplicate asset.
                    
                    loadManager.fetch(assetURL, 'text', jsonParser, function (json) {
                        // assetURL is the asset json file
                        // json.url is the png, mp3, etc. referenced by the file
                        switch (type) {
                        case 'font':
                            gameSource.assets[assetName] = loadFont(assetName, json, assetURL);
                            break;
                            
                        case 'sprite':
                            gameSource.assets[assetName] = loadSpritesheet(assetName, json, assetURL, null);
                            break;
                            
                        case 'sound':
                            gameSource.assets[assetName] = loadSound(assetName, json, assetURL);
                            break;
                            
                        case 'map':
                            gameSource.assets[assetName] = loadMap(assetName, json, assetURL);
                            break;
                            
                        case 'data':
                            gameSource.assets[assetName] = loadData(assetName, json, assetURL);
                            break;
                            
                        default:
                            console.log('Unrecognized asset type: "' + type + '"');
                        }
                        
                    }, // end of callback
                                      null, // error callback
                                      null, // warning callback
                                      computeForceReloadFlag(assetURL)
                                     );
                } // if preview.png
            } // for each asset
        } // Assets

        // Constants:
        gameSource.constants = {};
        loadConstants(gameJSON.constants, gameURL, false, gameSource.constants);
        
        // Docs: Load the names, but do not load the documents themselves.
        gameSource.docs = [];
        if (gameJSON.docs) {
            // Just clone the array
            gameSource.docs = gameJSON.docs.slice(0);
            for (let d = 0; d < gameSource.docs.length; ++d) {
                const doc = gameSource.docs[d];
                if (typeof doc === 'string') {
                    gameSource.docs[d] = makeURLAbsolute(gameURL, doc);
                } else {
                    // Legacy game.json format with metadata on the document. No longer supported
                    gameSource.docs[d] = makeURLAbsolute(gameURL, doc.url);
                }
            }
        } // if docs        
    } // processGameJSON