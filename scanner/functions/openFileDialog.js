function openFileDialog() {
    const {dialog} = requireNode('electron').remote;
    return dialog.showOpenDialog({
        title: 'Open a sysdig capture',
        properties: ['openFile', 'multiSelections'],
        filters: [
            {name: 'Sysdig capture', extensions: ['scap']},
            {name: 'All Files', extensions: ['*']}
        ],
    });
}