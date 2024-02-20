function notebookOnlyEvent(callback) {
    // Only call the callback to redirect the event if the notebook should be
    // handling the events, at the discretion of the keyboard manager.
    // If the focus is in a text widget or something (kbmanager disabled),
    // allow the default event.
    return function() {
        if (Jupyter.keyboard_manager.enabled) {
            callback.apply(this, arguments);
        }
    };
}