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