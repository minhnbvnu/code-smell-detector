function createPanelIfReactLoaded() {
  if (panelCreated) {
    return;
  }

  chrome.devtools.inspectedWindow.eval('window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.size > 0', function (pageHasReact, error) {
    if (!pageHasReact || panelCreated) {
      return;
    }

    panelCreated = true;
    clearInterval(loadCheckInterval);
    let bridge = null;
    let store = null;
    let profilingData = null;
    let componentsPortalContainer = null;
    let profilerPortalContainer = null;
    let cloneStyleTags = null;
    let mostRecentOverrideTab = null;
    let render = null;
    let root = null;
    const tabId = chrome.devtools.inspectedWindow.tabId;
    registerDevToolsEventLogger('extension', async () => {
      // TODO: after we upgrade to Manifest V3, chrome.tabs.query returns a Promise
      // without the callback.
      return new Promise(resolve => {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, tabs => {
          var _tabs$;

          resolve({
            page_url: (_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.url
          });
        });
      });
    });

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

    cloneStyleTags = () => {
      const linkTags = []; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

      for (const linkTag of document.getElementsByTagName('link')) {
        if (linkTag.rel === 'stylesheet') {
          const newLinkTag = document.createElement('link'); // eslint-disable-next-line no-for-of-loops/no-for-of-loops

          for (const attribute of linkTag.attributes) {
            newLinkTag.setAttribute(attribute.nodeName, attribute.nodeValue);
          }

          linkTags.push(newLinkTag);
        }
      }

      return linkTags;
    };

    initBridgeAndStore();

    function ensureInitialHTMLIsCleared(container) {
      if (container._hasInitialHTMLBeenCleared) {
        return;
      }

      container.innerHTML = '';
      container._hasInitialHTMLBeenCleared = true;
    }

    function setBrowserSelectionFromReact() {
      // This is currently only called on demand when you press "view DOM".
      // In the future, if Chrome adds an inspect() that doesn't switch tabs,
      // we could make this happen automatically when you select another component.
      chrome.devtools.inspectedWindow.eval('(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 !== $0) ?' + '(inspect(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0), true) :' + 'false', (didSelectionChange, evalError) => {
        if (evalError) {
          console.error(evalError);
        }
      });
    }

    function setReactSelectionFromBrowser() {
      // When the user chooses a different node in the browser Elements tab,
      // copy it over to the hook object so that we can sync the selection.
      chrome.devtools.inspectedWindow.eval('(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ && window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 !== $0) ?' + '(window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0 = $0, true) :' + 'false', (didSelectionChange, evalError) => {
        if (evalError) {
          console.error(evalError);
        } else if (didSelectionChange) {
          // Remember to sync the selection next time we show Components tab.
          needsToSyncElementSelection = true;
        }
      });
    }

    setReactSelectionFromBrowser();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      setReactSelectionFromBrowser();
    });
    let currentPanel = null;
    let needsToSyncElementSelection = false;
    chrome.devtools.panels.create(isChrome || isEdge ? '⚛️ Components' : 'Components', '', 'panel.html', extensionPanel => {
      extensionPanel.onShown.addListener(panel => {
        if (needsToSyncElementSelection) {
          needsToSyncElementSelection = false;
          bridge.send('syncSelectionFromNativeElementsPanel');
        }

        if (currentPanel === panel) {
          return;
        }

        currentPanel = panel;
        componentsPortalContainer = panel.container;

        if (componentsPortalContainer != null) {
          ensureInitialHTMLIsCleared(componentsPortalContainer);
          render('components');
          panel.injectStyles(cloneStyleTags);
          Object(Logger["a" /* logEvent */])({
            event_name: 'selected-components-tab'
          });
        }
      });
      extensionPanel.onHidden.addListener(panel => {// TODO: Stop highlighting and stuff.
      });
    });
    chrome.devtools.panels.create(isChrome || isEdge ? '⚛️ Profiler' : 'Profiler', '', 'panel.html', extensionPanel => {
      extensionPanel.onShown.addListener(panel => {
        if (currentPanel === panel) {
          return;
        }

        currentPanel = panel;
        profilerPortalContainer = panel.container;

        if (profilerPortalContainer != null) {
          ensureInitialHTMLIsCleared(profilerPortalContainer);
          render('profiler');
          panel.injectStyles(cloneStyleTags);
          Object(Logger["a" /* logEvent */])({
            event_name: 'selected-profiler-tab'
          });
        }
      });
    });
    chrome.devtools.network.onNavigated.removeListener(checkPageForReact); // Re-initialize DevTools panel when a new page is loaded.

    chrome.devtools.network.onNavigated.addListener(function onNavigated() {
      // Re-initialize saved filters on navigation,
      // since global values stored on window get reset in this case.
      syncSavedPreferences(); // It's easiest to recreate the DevTools panel (to clean up potential stale state).
      // We can revisit this in the future as a small optimization.

      Object(react_dom["flushSync"])(() => root.unmount());
      initBridgeAndStore();
    });
  });
}