function logElementToConsole(id) {
    const result = isMostRecentlyInspectedElementCurrent(id) ? mostRecentlyInspectedElement : inspectElementRaw(id);

    if (result === null) {
      console.warn(`Could not find Fiber with id "${id}"`);
      return;
    }

    const supportsGroup = typeof console.groupCollapsed === 'function';

    if (supportsGroup) {
      console.groupCollapsed(`[Click to expand] %c<${result.displayName || 'Component'} />`, // --dom-tag-name-color is the CSS variable Chrome styles HTML elements with in the console.
      'color: var(--dom-tag-name-color); font-weight: normal;');
    }

    if (result.props !== null) {
      console.log('Props:', result.props);
    }

    if (result.state !== null) {
      console.log('State:', result.state);
    }

    if (result.hooks !== null) {
      console.log('Hooks:', result.hooks);
    }

    const nativeNodes = findNativeNodesForFiberID(id);

    if (nativeNodes !== null) {
      console.log('Nodes:', nativeNodes);
    }

    if (result.source !== null) {
      console.log('Location:', result.source);
    }

    if (window.chrome || /firefox/i.test(navigator.userAgent)) {
      console.log('Right-click any value to save it as a global variable for further inspection.');
    }

    if (supportsGroup) {
      console.groupEnd();
    }
  }