function useModalDismissSignal(modalRef, dismissCallback, dismissOnClickOutside = true) {
  Object(react["useEffect"])(() => {
    if (modalRef.current === null) {
      return () => {};
    }

    const handleDocumentKeyDown = event => {
      if (event.key === 'Escape') {
        dismissCallback();
      }
    };

    const handleDocumentClick = event => {
      if (modalRef.current !== null && !modalRef.current.contains(event.target)) {
        event.stopPropagation();
        event.preventDefault();
        dismissCallback();
      }
    };

    let ownerDocument = null; // Delay until after the current call stack is empty,
    // in case this effect is being run while an event is currently bubbling.
    // In that case, we don't want to listen to the pre-existing event.

    let timeoutID = setTimeout(() => {
      timeoutID = null; // It's important to listen to the ownerDocument to support the browser extension.
      // Here we use portals to render individual tabs (e.g. Profiler),
      // and the root document might belong to a different window.

      const div = modalRef.current;

      if (div != null) {
        ownerDocument = div.ownerDocument;
        ownerDocument.addEventListener('keydown', handleDocumentKeyDown);

        if (dismissOnClickOutside) {
          ownerDocument.addEventListener('click', handleDocumentClick, true);
        }
      }
    }, 0);
    return () => {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
      }

      if (ownerDocument !== null) {
        ownerDocument.removeEventListener('keydown', handleDocumentKeyDown);
        ownerDocument.removeEventListener('click', handleDocumentClick, true);
      }
    };
  }, [modalRef, dismissCallback, dismissOnClickOutside]);
}