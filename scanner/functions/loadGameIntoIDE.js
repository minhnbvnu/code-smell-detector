function loadGameIntoIDE(url, callback, loadFast, noUpdateCode) {
    if (url !== gameURL) {
        // A new game is being loaded. Throw away the editor sessions.
        removeAllCodeEditorSessions();
    }
    
    if (emulatorMode !== 'stop') { onStopButton(false, true); }

    const isLauncher = /(^quad:\/\/console\/|\/launcher\.game\.json$)/.test(url);
    if (! isLauncher && ! loadFast) {
        showBootScreen();
    }
    gameURL = url;

    // See if the game is on the same server and not in the
    // games/ or examples/ directory
    editableProject = locallyHosted() && useIDE && isQuadserver && ! isBuiltIn(gameURL);
    // Disable the play, slow, and step buttons
    document.getElementById('slowButton').enabled =
        document.getElementById('stepButton').enabled =
        document.getElementById('playButton').enabled = false;

    const copyMenu = document.getElementById('copyMenu');
    copyMenu.style.display = (isQuadserver && locallyHosted(gameURL)) ? 'block' : 'none';
    
    // Let the boot screen show before appending in the following code
    const loadFunction = function() {
        {
            let serverURL = location.origin + location.pathname;
            // Remove common subexpression for shorter URLs
            if (url.substring(0, serverURL.length) === serverURL) {
                url = url.substring(serverURL.length);
            }
            
            // Remove redundant filename for shorterURLs
            url = url.replace(/([^\/:=&]+)\/([^\/:=&]+?)\.game\.json$/, function (match, path, filename) {
                return (path === filename) ? path + '/' : match;
            });
            
            serverURL += '?game=' + url;

            if (/^http:\/\/(127\.0\.0\.1|localhost):/.test(serverURL)) {
                document.getElementById('serverURL').innerHTML =
                    '<p>Your quadplay✜ is in secure mode and has disabled mobile serving.</p><p>Restart the command-line program using <code style="white-space:nowrap">quadplay --serve</code> to allow serving games for mobile devices from this machine for development.</p>';
                document.getElementById('serverQRCode').style.visibility = 'hidden';
                document.getElementById('serverQRMessage').style.visibility = 'hidden';
            } else {
                if (useIDE) { qrcode.makeCode(serverURL); }
                document.getElementById('serverURL').innerHTML =
                    `<a href="${serverURL}" target="_blank">${serverURL}</a>`;
                document.getElementById('serverQRCode').style.visibility = 'visible';
            }
        }

        const startTime = performance.now();
        onLoadFileStart(url);

        afterLoadGame(url, function () {
            onLoadFileComplete(url);
            hideBootScreen();
            updateTodoList();
            page.document.title = gameSource.extendedJSON.title;
            console.log(`Loading complete (${Math.round(performance.now() - startTime)} ms)`);

            setFramebufferSize(gameSource.extendedJSON.screen_size.x, gameSource.extendedJSON.screen_size.y, false);
            createProjectWindow(gameSource);
            const resourcePane = document.getElementById('resourcePane');

            let s = `
<br/><center><b style="color:#888; font-family:quadplay; font-size: 125%">Resource Limits</b></center>
<hr>
<br/>
<table style="margin-left: -2px; width: 100%">
<tr><td width=180>Code Statements</td><td class="right">${resourceStats.sourceStatements}</td><td>/</td><td class="right">2048</td><td class="right">(${Math.round(resourceStats.sourceStatements*100/2048)}%)</td></tr>
<tr><td>Sounds</td><td class="right">${resourceStats.sounds}</td><td>/</td><td class="right">128</td><td class="right">(${Math.round(resourceStats.sounds*100/128)}%)</td></tr>
<!--<tr><td>Sound Bytes</td><td class="right">${resourceStats.soundKilobytes}</td><td>/</td><td class="right">256 MB</td><td class="right">(${Math.round(resourceStats.soundKilobytes*100/(1024*256))}%)</td></tr>-->
<tr><td>Sprite Pixels</td><td class="right">${Math.round(resourceStats.spritePixels / 1000)}k</td><td>/</td><td class="right" width=40>5505k</td><td class="right" width=45>(${Math.round(resourceStats.spritePixels*100/5505024)}%)</td></tr>
<tr><td>Spritesheets</td><td class="right">${resourceStats.spritesheets}</td><td>/</td><td class="right">128</td><td class="right">(${Math.round(resourceStats.spritesheets*100/128)}%)</td></tr>
<tr><td>Spritesheet Width</td><td class="right">${resourceStats.maxSpritesheetWidth}</td><td>/</td><td class="right">1024</td><td class="right">(${resourceStats.maxSpritesheetWidth <= 1024 ? 'OK' : Math.round(resourceStats.maxSpritesheetWidth*100/1024) + '%'})</td></tr>
<tr><td>Spritesheet Height</td><td class="right">${resourceStats.maxSpritesheetHeight}</td><td>/</td><td class="right">1024</td><td class="right">(${resourceStats.maxSpritesheetHeight <= 1024 ? 'OK' : Math.round(resourceStats.maxSpritesheetHeight*100/1024) + '%'})</td></tr>
</table>`;

            {
                const summary = `${resourceStats.sourceStatements} statements, ${resourceStats.sounds} sounds, ${Math.round(resourceStats.spritePixels / 1000)}k pixels`;
                s += `<button style="margin-top: 5px; font-size: 80%" onclick="window.top.navigator.clipboard.writeText('${summary}')">Copy Summary</button>`;
            }

            const resourceArray = [
                {name: 'Code Memory',   prop: 'sourceStatements', units: 'Statements', scale:1, suffix:''},
                {name: 'Sprite Memory', prop: 'spritePixels',     units: 'Pixels', scale: 1/1024, suffix: 'k'}//,
                // {name: 'Sound Memory',  prop: 'soundKilobytes',       units: 'Bytes', scale: 1, suffix:'kB'}
            ];

            for (const resource of resourceArray) {
                s += `<br/><center><b style="color:#888; font-family:quadplay; font-size: 125%">${resource.name}</b></center><hr><br/>`;
                const entryArray = Object.entries(resourceStats[resource.prop + 'ByURL']);
                
                // Sort by length
                entryArray.sort(function (a, b) { return b[1] - a[1]; });
                
                s += `<table width=100%><tr><th style="text-align:left">File</th><th width=120 colspan=2>${resource.units}</th></tr>\n`;
                for (const entry of entryArray) {
                    s += `<tr><td>${entry[0].replace(/^.*\//, '')}</td><td style="text-align:right">${Math.ceil(entry[1] * resource.scale)}${resource.suffix}</td><td width=30px></td></tr>\n`;
                }
                s += '</table>';
            }

            resourcePane.innerHTML = s;
            
            document.getElementById('restartButtonContainer').enabled =
                document.getElementById('slowButton').enabled =
                document.getElementById('stepButton').enabled =
                document.getElementById('playButton').enabled = true;
            
            const modeEditor = document.getElementById('modeEditor');
            if (modeEditor.style.visibility === 'visible') {
                // Update the mode diagram if it is visible
                visualizeModes(modeEditor);
            }
            
            if (! noUpdateCode) {
                updateAllCodeEditorSessions();
            }
            hideWaitDialog();

            if (callback) { callback(); }
        }, function (e) {
            updateAllCodeEditorSessions();
            document.getElementById('restartButtonContainer').enabled =
                document.getElementById('slowButton').enabled =
                document.getElementById('stepButton').enabled =
                document.getElementById('playButton').enabled = true;
            hideBootScreen();
            setErrorStatus('Loading ' + url + ' failed: ' + e);
            onStopButton();
            hideWaitDialog();
        });
    };

    if (loadFast) {
        loadFunction();
    } else {
        setTimeout(loadFunction, 0);
    }
}