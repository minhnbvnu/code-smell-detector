function $start_hosting(show_buttons) {
    if (show_buttons || (show_buttons === undefined)) {
        // Default
        QRuntime.$showCopyButtonsMode = QRuntime.$gameMode;
    } else {
        QRuntime.$showCopyButtonsMode = undefined;
    }
    updateHostCodeCopyRuntimeDialogVisiblity();
    
    startHosting();
}