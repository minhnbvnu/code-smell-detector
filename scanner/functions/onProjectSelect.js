function onProjectSelect(target, type, object) {
    // Don't do anything if the game hasn't loaded yet. Any
    // editor is likely to crash at this point with undefined
    // children.
    if (! gameSource || ! gameSource.json) { return; }
    
    // Hide all editors
    const editorFrame = document.getElementById('editorFrame');
    for (let i = 0; i < editorFrame.children.length; ++i) {
        editorFrame.children[i].style.visibility = 'hidden';
    }
    
    const gameEditor    = document.getElementById('gameEditor');
    const modeEditor    = document.getElementById('modeEditor');
    const codePlusFrame = document.getElementById('codePlusFrame');

    // Hide the viewers within the content pane for the code editor
    const codeEditorContentFrame = document.getElementById('codeEditorContentFrame');
    for (let i = 0; i < codeEditorContentFrame.children.length; ++i) {
        codeEditorContentFrame.children[i].style.visibility = 'hidden';
    }

    const codeEditor     = document.getElementById('codeEditor');
    const spriteEditor   = document.getElementById('spriteEditor');
    const soundEditor    = document.getElementById('soundEditor');
    const mapEditor      = document.getElementById('mapEditor');
    const docEditor      = document.getElementById('docEditor');

    document.getElementById('spriteEditorHighlight').style.visibility =
        document.getElementById('spriteEditorPivot').style.visibility = 'hidden';
    
    let list = document.getElementsByClassName('selectedProjectElement');
    for (let i = 0; i < list.length; ++i) {
        list[i].classList.remove('selectedProjectElement');
    }

    if ((type === 'mode') && (object === undefined)) {
        // Select the mode diagram itself
        target.classList.add('selectedProjectElement');
        visualizeModes(modeEditor);
        modeEditor.style.visibility = 'visible';
        return;
    }

    document.getElementById('codeEditorDivider').style.visibility = 'unset';    
    if (type === 'doc') {
        // Documents
        target.classList.add('selectedProjectElement');
        showGameDoc(object);
        docEditor.style.visibility = 'visible';
        codePlusFrame.style.visibility = 'visible';

        codePlusFrame.style.gridTemplateRows = `auto 0px 0px 1fr`;
        
        if (object.endsWith('.md') ||
            object.endsWith('.html') ||
            object.endsWith('.txt')) {

            // Show the editor after loading the content
            if (fileContents[object] !== undefined) {
                setCodeEditorDividerFromLocalStorage();
                setCodeEditorSession(object);
            } else {
                // Load and set the contents
                LoadManager.fetchOne({forceReload: true}, object, 'text', null, function (doc) {
                    fileContents[object] = doc;
                    setCodeEditorDividerFromLocalStorage();
                    setCodeEditorSession(object);
                });
            }
        }
        return;
    }

    if (type === 'game') {
        if (target) { target.classList.add('selectedProjectElement'); }
        visualizeGame(gameEditor, gameSource.jsonURL, gameSource.json);
        gameEditor.style.visibility = 'visible';
        codePlusFrame.style.visibility = 'visible';
        setCodeEditorDividerFromLocalStorage();
        setCodeEditorSession(gameSource.jsonURL);
        return;
    }

    // Find the parent .li
    while (target && (target.tagName !== 'LI')) {
        target = target.parentNode;
    }

    if (target) {
        target.classList.add('selectedProjectElement');
    }

    switch (type) {
    case 'constant':
        // object may be undefined
        showConstantEditor(object);
        break;
        
    case 'mode':
    case 'script':
        {
            // See if there is already an open editor session, and create one if it
            // doesn't exist
            const url = (type === 'mode') ? object.url : object;
            setCodeEditorSession(url);
            // Show the code editor and hide the content pane
            codePlusFrame.style.visibility = 'visible';
            codePlusFrame.style.gridTemplateRows = 'auto 0px 0px 1fr';
            document.getElementById('codeEditorDivider').style.visibility = 'hidden';
        }
        break;
        
    case 'asset':
        console.assert(object);
        const url = object.$url || object.src;
        // Find the underlying gameSource.asset key for this asset so
        // that we can fetch it again if needed
        let assetName;
        for (const k in gameSource.assets) {
            const asset = gameSource.assets[k];
            if (asset === object) {
                assetName = k;
                break;
            } else if (asset.spritesheet && asset.spritesheet === object) {
                // Spritesheet on a map
                assetName = asset.$name + '.spritesheet';
                break;
            }
        }
        console.assert(assetName, 'Could not find asset name for ' + object);
        setCodeEditorSession(object.$jsonURL, assetName);

        // Show the code editor and the content pane
        codePlusFrame.style.visibility = 'visible';
        setCodeEditorDividerFromLocalStorage();
        const spriteEditorHighlight = document.getElementById('spriteEditorHighlight');
        const spriteEditorPivot = document.getElementById('spriteEditorPivot');
        const spriteEditorInfo = document.getElementById('spriteEditorInfo');
        spriteEditorHighlight.style.visibility = 'hidden';
        spriteEditorPivot.style.visibility = 'hidden';
        spriteEditor.onmousemove = spriteEditor.onmousedown = undefined;
        
        if (/\.png$/i.test(url)) {
            // Sprite or font
            spriteEditor.style.visibility = 'visible';
            // Force a reload with the ?
            spriteEditor.style.backgroundImage = `url("${url}?reload${Math.floor(Math.random() * 1e6)}")`;

            if (! object.size || (object.size.x > object.size.y)) {
                // Fit horizontally
                spriteEditor.style.backgroundSize = '100% auto';
            } else {
                // Fit vertically
                spriteEditor.style.backgroundSize = 'auto 100%';
            }
        
            if (object.$type === 'spritesheet') {
                spriteEditor.onmousemove = spriteEditor.onmousedown = function (e) {
                    
                    if (object.size === undefined) {
                        console.warn('object.size is undefined');
                        return;
                    }
                    const editorBounds = spriteEditor.getBoundingClientRect();

                    // The spritesheet fits along the longer axis
                    const scale = (object.size.x > object.size.y) ?
                          (editorBounds.width / object.$sourceSize.x) :
                          (editorBounds.height / object.$sourceSize.y);
                    
                    const mouseX = e.clientX - editorBounds.left;
                    const mouseY = e.clientY - editorBounds.top;
                    
                    const scaledSpriteWidth = object.sprite_size.x * scale;
                    const scaledSpriteHeight = object.sprite_size.y * scale;

                    const scaledSpriteStrideWidth = (object.sprite_size.x + object.$gutter) * scale;
                    const scaledSpriteStrideHeight = (object.sprite_size.y + object.$gutter) * scale;

                    spriteEditorPivot.style.fontSize = Math.round(clamp(Math.min(scaledSpriteWidth, scaledSpriteHeight) * 0.18, 5, 25)) + 'px';

                    // Offset for the sprite region within the PNG
                    const scaledCornerX = object.$sourceRegion.corner.x * scale;
                    const scaledCornerY = object.$sourceRegion.corner.y * scale;

                    // Integer spritesheet index (before transpose)
                    let X = Math.floor((mouseX - scaledCornerX) / scaledSpriteStrideWidth);
                    let Y = Math.floor((mouseY - scaledCornerY) / scaledSpriteStrideHeight);

                    spriteEditorHighlight.style.left   = Math.floor(X * scaledSpriteStrideWidth + scaledCornerX) + 'px';
                    spriteEditorHighlight.style.top    = Math.floor(Y * scaledSpriteStrideHeight + scaledCornerY) + 'px';
                    spriteEditorHighlight.style.width  = Math.floor(scaledSpriteWidth) + 'px';
                    spriteEditorHighlight.style.height = Math.floor(scaledSpriteHeight) + 'px';

                    let U = X, V = Y;
                    if (object.$json.transpose) { U = Y; V = X; }
                    const sprite = object[U] && object[U][V];

                    if (sprite) {
                        const pivot = sprite.pivot || {x: 0, y: 0};
                        spriteEditorPivot.style.visibility = 'visible';
                        spriteEditorPivot.style.left = Math.floor(scale * (sprite.pivot.x + sprite.size.x / 2) - spriteEditorPivot.offsetWidth / 2) + 'px';
                        spriteEditorPivot.style.top = Math.floor(scale * (sprite.pivot.y + sprite.size.y / 2) - spriteEditorPivot.offsetHeight / 2) + 'px';
                            
                        let str = `${assetName}[${U}][${V}]`;
                        if (sprite.$animationName) {
                            str += `<br>${assetName}.${sprite.$animationName}`
                            if (sprite.$animationIndex !== undefined) {
                                const animation = object[sprite.$animationName];
                                str += `[${sprite.$animationIndex}]<br>extrapolate: "${animation.extrapolate || 'clamp'}"`;
                            }
                        }

                        str += `<br>frames: ${sprite.frames}`;
                        spriteEditorInfo.innerHTML = str;

                        if (mouseX > editorBounds.width / 2) {
                            // Move the info to be right aligned to keep it visible
                            spriteEditorInfo.style.float = 'right';
                            spriteEditorInfo.style.right = '10px';
                            spriteEditorInfo.style.left = 'unset';
                            spriteEditorHighlight.style.textAlign = 'right';
                        } else {
                            spriteEditorInfo.style.float = 'none';
                            spriteEditorInfo.style.right = 'unset';
                            spriteEditorInfo.style.left = '10px';
                            spriteEditorHighlight.style.textAlign = 'left';
                        }

                        if (mouseY > editorBounds.height / 2) {
                            // Move the info to the top to keep it visible
                            spriteEditorInfo.style.top = '-60px';
                        } else {
                            spriteEditorInfo.style.top = Math.floor(scaledSpriteHeight + 5) + 'px';
                        }
                        spriteEditorHighlight.style.visibility = 'inherit';
                    } else {
                        // Out of bounds
                        spriteEditorHighlight.style.visibility = 'hidden';
                        spriteEditorPivot.style.visibility = 'hidden';
                    }
                };
                
                // Initial position
                const editorBounds = spriteEditor.getBoundingClientRect();
                spriteEditor.onmousemove({clientX: editorBounds.left, clientY: editorBounds.top});
            } else {
                // Font
                spriteEditorHighlight.style.visibility = 'hidden';
                spriteEditorPivot.style.visibility = 'hidden';
            }
        } else if (/\.mp3$/i.test(url)) {
            soundEditor.style.visibility = 'visible';
            soundEditorCurrentSound = object;
            document.querySelector('#soundEditor audio').src = object.$url;
        } else if (/\.tmx$/i.test(url)) {
            visualizeMap(object);
            mapEditor.style.visibility = 'visible';
        }
        break;
    }
}