function initBridgeAndStore() {
      const port = chrome.runtime.connect({
        name: String(tabId)
      }); // Looks like `port.onDisconnect` does not trigger on in-tab navigation like new URL or back/forward navigation,
      // so it makes no sense to handle it here.

      bridge = new src_bridge({
        listen(fn) {
          const listener = message => fn(message); // Store the reference so that we unsubscribe from the same object.


          const portOnMessage = port.onMessage;
          portOnMessage.addListener(listener);
          return () => {
            portOnMessage.removeListener(listener);
          };
        },

        send(event, payload, transferable) {
          port.postMessage({
            event,
            payload
          }, transferable);
        }

      });
      bridge.addListener('reloadAppForProfiling', () => {
        Object(storage["c" /* localStorageSetItem */])(LOCAL_STORAGE_SUPPORTS_PROFILING_KEY, 'true');
        chrome.devtools.inspectedWindow.eval('window.location.reload();');
      });
      bridge.addListener('syncSelectionToNativeElementsPanel', () => {
        setBrowserSelectionFromReact();
      }); // This flag lets us tip the Store off early that we expect to be profiling.
      // This avoids flashing a temporary "Profiling not supported" message in the Profiler tab,
      // after a user has clicked the "reload and profile" button.

      let isProfiling = false;
      let supportsProfiling = false;

      if (Object(storage["a" /* localStorageGetItem */])(LOCAL_STORAGE_SUPPORTS_PROFILING_KEY) === 'true') {
        supportsProfiling = true;
        isProfiling = true;
        Object(storage["b" /* localStorageRemoveItem */])(LOCAL_STORAGE_SUPPORTS_PROFILING_KEY);
      }

      if (store !== null) {
        profilingData = store.profilerStore.profilingData;
      }

      bridge.addListener('extensionBackendInitialized', () => {
        // Initialize the renderer's trace-updates setting.
        // This handles the case of navigating to a new page after the DevTools have already been shown.
        bridge.send('setTraceUpdatesEnabled', Object(storage["a" /* localStorageGetItem */])(constants["p" /* LOCAL_STORAGE_TRACE_UPDATES_ENABLED_KEY */]) === 'true');
      });
      store = new store_Store(bridge, {
        isProfiling,
        supportsReloadAndProfile: isChrome || isEdge,
        supportsProfiling,
        // At this time, the timeline can only parse Chrome performance profiles.
        supportsTimeline: isChrome,
        supportsTraceUpdates: true
      });

      if (!isProfiling) {
        store.profilerStore.profilingData = profilingData;
      } // Initialize the backend only once the Store has been initialized.
      // Otherwise the Store may miss important initial tree op codes.


      chrome.devtools.inspectedWindow.eval(`window.postMessage({ source: 'react-devtools-inject-backend' }, '*');`, function (response, evalError) {
        if (evalError) {
          console.error(evalError);
        }
      });

      const viewAttributeSourceFunction = (id, path) => {
        const rendererID = store.getRendererIDForElement(id);

        if (rendererID != null) {
          // Ask the renderer interface to find the specified attribute,
          // and store it as a global variable on the window.
          bridge.send('viewAttributeSource', {
            id,
            path,
            rendererID
          });
          setTimeout(() => {
            // Ask Chrome to display the location of the attribute,
            // assuming the renderer found a match.
            chrome.devtools.inspectedWindow.eval(`
                if (window.$attribute != null) {
                  inspect(window.$attribute);
                }
              `);
          }, 100);
        }
      };

      const viewElementSourceFunction = id => {
        const rendererID = store.getRendererIDForElement(id);

        if (rendererID != null) {
          // Ask the renderer interface to determine the component function,
          // and store it as a global variable on the window
          bridge.send('viewElementSource', {
            id,
            rendererID
          });
          setTimeout(() => {
            // Ask Chrome to display the location of the component function,
            // or a render method if it is a Class (ideally Class instance, not type)
            // assuming the renderer found one.
            chrome.devtools.inspectedWindow.eval(`
                if (window.$type != null) {
                  if (
                    window.$type &&
                    window.$type.prototype &&
                    window.$type.prototype.isReactComponent
                  ) {
                    // inspect Component.render, not constructor
                    inspect(window.$type.prototype.render);
                  } else {
                    // inspect Functional Component
                    inspect(window.$type);
                  }
                }
              `);
          }, 100);
        }
      };

      const viewUrlSourceFunction = (url, line, col) => {
        chrome.devtools.panels.openResource(url, line, col);
      };

      let debugIDCounter = 0; // For some reason in Firefox, chrome.runtime.sendMessage() from a content script
      // never reaches the chrome.runtime.onMessage event listener.

      let fetchFileWithCaching = null;

      if (isChrome) {
        const fetchFromNetworkCache = (url, resolve, reject) => {
          // Debug ID allows us to avoid re-logging (potentially long) URL strings below,
          // while also still associating (potentially) interleaved logs with the original request.
          let debugID = null;

          if (constants["F" /* __DEBUG__ */]) {
            debugID = debugIDCounter++;
            console.log(`[main] fetchFromNetworkCache(${debugID})`, url);
          }

          chrome.devtools.network.getHAR(harLog => {
            for (let i = 0; i < harLog.entries.length; i++) {
              const entry = harLog.entries[i];

              if (url === entry.request.url) {
                if (constants["F" /* __DEBUG__ */]) {
                  console.log(`[main] fetchFromNetworkCache(${debugID}) Found matching URL in HAR`, url);
                }

                entry.getContent(content => {
                  if (content) {
                    if (constants["F" /* __DEBUG__ */]) {
                      console.log(`[main] fetchFromNetworkCache(${debugID}) Content retrieved`);
                    }

                    resolve(content);
                  } else {
                    if (constants["F" /* __DEBUG__ */]) {
                      console.log(`[main] fetchFromNetworkCache(${debugID}) Invalid content returned by getContent()`, content);
                    } // Edge case where getContent() returned null; fall back to fetch.


                    fetchFromPage(url, resolve, reject);
                  }
                });
                return;
              }
            }

            if (constants["F" /* __DEBUG__ */]) {
              console.log(`[main] fetchFromNetworkCache(${debugID}) No cached request found in getHAR()`);
            } // No matching URL found; fall back to fetch.


            fetchFromPage(url, resolve, reject);
          });
        };

        const fetchFromPage = (url, resolve, reject) => {
          if (constants["F" /* __DEBUG__ */]) {
            console.log('[main] fetchFromPage()', url);
          }

          function onPortMessage({
            payload,
            source
          }) {
            if (source === 'react-devtools-content-script') {
              switch (payload === null || payload === void 0 ? void 0 : payload.type) {
                case 'fetch-file-with-cache-complete':
                  chrome.runtime.onMessage.removeListener(onPortMessage);
                  resolve(payload.value);
                  break;

                case 'fetch-file-with-cache-error':
                  chrome.runtime.onMessage.removeListener(onPortMessage);
                  reject(payload.value);
                  break;
              }
            }
          }

          chrome.runtime.onMessage.addListener(onPortMessage);
          chrome.devtools.inspectedWindow.eval(`
              window.postMessage({
                source: 'react-devtools-extension',
                payload: {
                  type: 'fetch-file-with-cache',
                  url: "${url}",
                },
              });
            `);
        }; // Fetching files from the extension won't make use of the network cache
        // for resources that have already been loaded by the page.
        // This helper function allows the extension to request files to be fetched
        // by the content script (running in the page) to increase the likelihood of a cache hit.


        fetchFileWithCaching = url => {
          return new Promise((resolve, reject) => {
            // Try fetching from the Network cache first.
            // If DevTools was opened after the page started loading, we may have missed some requests.
            // So fall back to a fetch() from the page and hope we get a cached response that way.
            fetchFromNetworkCache(url, resolve, reject);
          });
        };
      } // TODO (Webpack 5) Hopefully we can remove this prop after the Webpack 5 migration.


      const hookNamesModuleLoaderFunction = () => Promise.all(/* import() | parseHookNames */[__webpack_require__.e(8), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 216));

      root = Object(client["createRoot"])(document.createElement('div'));

      render = (overrideTab = mostRecentOverrideTab) => {
        mostRecentOverrideTab = overrideTab;
        root.render( /*#__PURE__*/Object(react["createElement"])(DevTools_DevTools, {
          bridge,
          browserTheme: getBrowserTheme(),
          componentsPortalContainer,
          enabledInspectedElementContextMenu: true,
          fetchFileWithCaching,
          hookNamesModuleLoaderFunction,
          overrideTab,
          profilerPortalContainer,
          showTabBar: false,
          store,
          warnIfUnsupportedVersionDetected: true,
          viewAttributeSourceFunction,
          viewElementSourceFunction,
          viewUrlSourceFunction
        }));
      };

      render();
    }