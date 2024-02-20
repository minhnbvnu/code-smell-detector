function updateHostCodeCopyRuntimeDialogVisiblity() {
    let curr = document.getElementById('hostCodeCopyRuntimeDialog').classList.contains('show');
    let next = ((QRuntime.$gameMode === QRuntime.$showCopyButtonsMode) ||
                (QRuntime.$gameMode.name === '$OnlineMenu')) && isHosting;

    if (curr !== next) {
        setRuntimeDialogVisible('hostCodeCopy', next);
    }
}