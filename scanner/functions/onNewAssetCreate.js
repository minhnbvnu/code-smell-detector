function onNewAssetCreate() {
    const type = document.getElementById('newAssetType').value.toLowerCase();
    const nameBox = document.getElementById('newAssetName');
    const fileName = nameBox.value;
    const assetName = fileName + '_' + type;

    const assetCreator = document.getElementById('newAssetCreator').value.trim();
    const assetLicense = document.getElementById('newAssetLicense').value.trim();

    let license = '' + new Date().getFullYear();
    if (/cc0|public domain/i.test(assetLicense)) {
        license = 'By ' + assetCreator + ' ' + license;
    } else {
        license = '©' + license + ' ' + assetCreator;
    }
    license += '. ' + assetLicense;

    // Warn on overwrite
    if ((gameSource.json.assets[assetName] !== undefined) &&
        ! window.confirm(`There is already an asset called ${name} in your game. Replace it?`)) {
        nameBox.focus();
        return;
    }

    // Add the new name to the game
    gameSource.json.assets[assetName] = fileName + '.' + type + '.json';

    const gamePath = getGamePath();
    const dataType = {'sprite': 'png', 'map': 'tmx', 'sound': 'mp3', 'font': 'png'};
    const templateJSONParameters = {
        license: license,
        url: fileName + '.' + dataType[type]
    };

    switch (type) {
    case 'sprite':
        createNewAssetFromTemplate(assetName, gamePath, fileName, type, 'png', templateJSONParameters);
        break;

    case 'sound':
        createNewAssetFromTemplate(assetName, gamePath, fileName, type, 'mp3', templateJSONParameters);
        break;

    case 'map':
        let spriteURL = document.getElementById('newAssetMapSpritesheet').value;

        function makeMap(pngURL, spriteJSON, spriteImage, spriteURL) {
            console.assert(spriteJSON);
            console.assert(spriteImage);

            // Needed for both the TMX and json
            const width   = clamp(readIntFromControl('newAssetMapWidth', 16), 1, 8192);
            const height  = clamp(readIntFromControl('newAssetMapHeight', 16), 1, 8192);
            const layers  = clamp(readIntFromControl('newAssetMapLayers', 1), 1, 8192);
            const yUp     = document.getElementById('newAssetMapYUp').checked;
            const zOffset = readNumberFromControl('newAssetMapZ0', 0);
            const zScale  = readNumberFromControl('newAssetMapZScale', 1);
            
            templateJSONParameters.loop_x = document.getElementById('newAssetMapLoopX').checked;
            templateJSONParameters.loop_y = document.getElementById('newAssetMapLoopY').checked;
            templateJSONParameters.z_offset = zOffset;
            templateJSONParameters.z_scale = zScale;
            templateJSONParameters.y_up = yUp;
            templateJSONParameters.sprite_url = templateJSONParameters.sprite_url2 = spriteURL;
            const spriteSize = spriteJSON.sprite_size || {x: spriteImage.width, y: spriteImage.height};
            
            if (document.getElementById('newAssetMapCenter').checked) {
                templateJSONParameters.offset_x = -spriteSize.x * width / 2;
                templateJSONParameters.offset_y = -spriteSize.y * height / 2;
            } else {
                templateJSONParameters.offset_x = templateJSONParameters.offset_y = 0;
            }
            
            const tmxContents = generateTMX(spriteURL, pngURL, spriteJSON, spriteSize.x, spriteSize.y, width, height, layers, spriteImage.width, spriteImage.height);
            createNewAssetFromTemplate(assetName, gamePath, fileName, type, 'tmx', templateJSONParameters, tmxContents);
        } // makeMap

        const loadOptions = {jsonParser: 'permissive'};
        const cloneSpriteJson = document.getElementById('newAssetMapCloneSpriteJson').checked;
        const cloneSpritePng = document.getElementById('newAssetMapCloneSpritePng').checked && cloneSpriteJson;

        LoadManager.fetchOne(
            loadOptions,
            makeURLAbsolute(window.gameURL, spriteURL),
            'json',
            undefined,
            function (spriteJson, raw, spriteHttpURL) {
                
                // Resolve the PNG's original URL to be relative to the
                // sprite if it is not quad:// absolute.
                let pngURL = spriteJson.url;
                if (! /^[a-z]+:\/\//.test(pngURL) && (spriteURL.indexOf('/') !== -1)) {
                    pngURL = spriteURL.replace(/\/[^/]+$/, '/') + pngURL;
                }

                LoadManager.fetchOne(
                    loadOptions,
                    makeURLAbsolute(spriteHttpURL, spriteJson.url),
                    'image',

                    undefined,
                    
                    function (image) {
                        // Clone sprite and JSON if required before triggering the map creation
                        if (cloneSpriteJson) {
                            // Make the sprite URL relative to the current directory
                            spriteURL = urlFilename(spriteURL);
                            
                            if (cloneSpritePng) {
                                // Put new PNG into the game directory
                                const newPngURL = urlFilename(pngURL);
                                
                                // Copy the original PNG bits (even
                                // though we have already loaded them
                                // as an image, since the PNG loading
                                // never gives us the original bits
                                // and we do not want to re-encode)
                                LoadManager.fetchOne(loadOptions, makeURLAbsolute(spriteHttpURL, pngURL), 'arraybuffer', null, function (pngRawData) {
                                    serverWriteFile(gamePath + newPngURL, 'binary', pngRawData);
                                });
                                
                                pngURL = newPngURL;
                            }
                            
                            // Update the spritesheet with the current pngURL
                            spriteJson.url = pngURL;

                            // Write the modified json
                            serverWriteFile(gamePath + spriteURL, 'utf8',
                                            WorkJSON.stringify(spriteJson, undefined, 4),
                                            function () {
                                                makeMap(pngURL, spriteJson, image, spriteURL);
                                            }, null);
                        } else {
                            // No cloning, use the original image and sprite
                            // urls.
                            makeMap(pngURL, spriteJson, image, spriteURL);
                        }
                    },
                    function (error) { alert(error + ' while loading sprite png for map from ' + pngURL); },
                    undefined, true);
            },
            function (error) { alert(error + ' while loading sprite json for map from ' + spriteURL); },
            undefined, true);
        break;
    }

    hideNewAssetDialog();
}