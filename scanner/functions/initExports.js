function initExports(revision, mostRecentStats, obsIsAnyOverlayShowing) {
    // Show/hide exports overlay.
    (() => {
        const exportButton = /** @type {!HTMLButtonElement} */ document.getElementById('export-button');
        const exportOverlay = /** @type {!HTMLDivElement} */ document.getElementById('export-overlay');
        const exportDiv = /** @type {HTMLDivElement} */ document.getElementById('export-div');
        exportButton.addEventListener('click', () => exportsIsVisible.set(true));
        obsIsAnyOverlayShowing.subscribe(e => { exportButton.disabled = e; });
        exportOverlay.addEventListener('click', () => exportsIsVisible.set(false));
        document.addEventListener('keydown', e => {
            const ESC_KEY = 27;
            if (e.keyCode === ESC_KEY) {
                exportsIsVisible.set(false)
            }
        });
        obsExportsIsShowing.subscribe(showing => {
            exportDiv.style.display = showing ? 'block' : 'none';
            if (showing) {
                document.getElementById('export-link-copy-button').focus();
            }
        });
    })();

    /**
     * @param {!HTMLButtonElement} button
     * @param {!HTMLElement} contentElement
     * @param {!HTMLElement} resultElement
     * @param {undefined|!function(): !string} contentMaker
     */
    const setupButtonElementCopyToClipboard = (button, contentElement, resultElement, contentMaker=undefined) =>
        button.addEventListener('click', () => {
            if (contentMaker !== undefined) {
                contentElement.innerText = contentMaker();
            }

            //noinspection UnusedCatchParameterJS,EmptyCatchBlockJS
            try {
                selectAndCopyToClipboard(contentElement);
                resultElement.innerText = "Done!";
            } catch (ex) {
                resultElement.innerText = "It didn't work...";
                console.warn('Clipboard copy failed.', ex);
            }
            button.disabled = true;
            setTimeout(() => {
                resultElement.innerText = "";
                button.disabled = false;
            }, 1000);
        });

    // Export escaped link.
    (() => {
        const linkElement = /** @type {HTMLAnchorElement} */ document.getElementById('export-escaped-anchor');
        const copyButton = /** @type {HTMLButtonElement} */ document.getElementById('export-link-copy-button');
        const copyResultElement = /** @type {HTMLElement} */ document.getElementById('export-link-copy-result');
        setupButtonElementCopyToClipboard(copyButton, linkElement, copyResultElement);
        revision.latestActiveCommit().subscribe(jsonText => {
            let escapedUrlHash = "#" + Config.URL_CIRCUIT_PARAM_KEY + "=" + encodeURIComponent(jsonText);
            linkElement.href = escapedUrlHash;
            linkElement.innerText = document.location.href.split("#")[0] + escapedUrlHash;
        });
    })();

    // Export JSON.
    (() => {
        const jsonTextElement = /** @type {HTMLPreElement} */ document.getElementById('export-circuit-json-pre');
        const copyButton = /** @type {HTMLButtonElement} */ document.getElementById('export-json-copy-button');
        const copyResultElement = /** @type {HTMLElement} */ document.getElementById('export-json-copy-result');
        setupButtonElementCopyToClipboard(copyButton, jsonTextElement, copyResultElement);
        revision.latestActiveCommit().subscribe(jsonText => {
            //noinspection UnusedCatchParameterJS
            try {
                let val = JSON.parse(jsonText);
                jsonTextElement.innerText = JSON.stringify(val, null, '  ');
            } catch (_) {
                jsonTextElement.innerText = jsonText;
            }
        });
    })();

    // Export final output.
    (() => {
        const outputTextElement = /** @type {HTMLPreElement} */ document.getElementById('export-amplitudes-pre');
        const copyButton = /** @type {HTMLButtonElement} */ document.getElementById('export-amplitudes-button');
        const copyResultElement = /** @type {HTMLElement} */ document.getElementById('export-amplitudes-result');
        const excludeAmps = /** @type {HTMLInputElement} */ document.getElementById('export-amplitudes-use-amps');
        obsIsAnyOverlayShowing.subscribe(_ => {
            outputTextElement.innerText = '[not generated yet]';
        });
        setupButtonElementCopyToClipboard(
            copyButton,
            outputTextElement,
            copyResultElement,
            () => {
                let raw = JSON.stringify(mostRecentStats.get().toReadableJson(!excludeAmps.checked), null, ' ');
                return raw.replace(/{\s*"r": /g, '{"r":').replace(/,\s*"i":\s*([-e\d\.]+)\s*}/g, ',"i":$1}');
            });
    })();

    // Export offline copy.
    (() => {
        const downloadButton = /** @type {HTMLButtonElement} */ document.getElementById('download-offline-copy-button');

        const fileNameForState = jsonText => {
            //noinspection UnusedCatchParameterJS,EmptyCatchBlockJS
            try {
                let circuitDef = fromJsonText_CircuitDefinition(jsonText);
                if (!circuitDef.isEmpty()) {
                    return `Quirk with Circuit - ${circuitDef.readableHash()}.html`;
                }
            } catch (_) {
            }
            return 'Quirk.html';
        };

        let latest;
        revision.latestActiveCommit().subscribe(jsonText => {
            downloadButton.innerText = `Download "${fileNameForState(jsonText)}"`;
            latest = jsonText;
        });

        downloadButton.addEventListener('click', () => {
            downloadButton.disabled = true;
            setTimeout(() => {
                downloadButton.disabled = false;
            }, 1000);
            let originalHtml = document.QUIRK_QUINE_ALL_HTML_ORIGINAL;

            // Inject default circuit.
            let startDefaultTag = '//DEFAULT_CIRCUIT_START\n';
            let endDefaultTag = '//DEFAULT_CIRCUIT_END\n';
            let modStart = originalHtml.indexOf(startDefaultTag);
            let modStop = originalHtml.indexOf(endDefaultTag, modStart);
            let moddedHtml =
                originalHtml.substring(0, modStart) +
                startDefaultTag +
                'document.DEFAULT_CIRCUIT = ' + JSON.stringify(latest) + ';\n' +
                originalHtml.substring(modStop);

            // Strip analytics.
            let anaStartTag = '<!-- Start Analytics -->\n';
            let anaStart = moddedHtml.indexOf(anaStartTag);
            if (anaStart !== -1) {
                let anaStopTag = '<!-- End Analytics -->\n';
                let anaStop = moddedHtml.indexOf(anaStopTag, anaStart);
                if (anaStop !== -1) {
                    moddedHtml =
                        moddedHtml.substring(0, anaStart) +
                        anaStartTag +
                        moddedHtml.substring(anaStop);
                }
            }

            saveFile(fileNameForState(latest), moddedHtml);
        });
    })();
}