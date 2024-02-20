function onPointerOver(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;

    if (target.tagName === 'IFRAME') {
      const iframe = target;

      try {
        if (!iframesListeningTo.has(iframe)) {
          const window = iframe.contentWindow;
          registerListenersOnWindow(window);
          iframesListeningTo.add(iframe);
        }
      } catch (error) {// This can error when the iframe is on a cross-origin.
      }
    } // Don't pass the name explicitly.
    // It will be inferred from DOM tag and Fiber owner.


    showOverlay([target], null, agent, false);
    selectFiberForNode(target);
  }