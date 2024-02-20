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