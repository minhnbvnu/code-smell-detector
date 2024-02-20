function settingsWinContextMenuSolution() {
    if (app.isReady()) {
        let template = [{
            label: i18n.__('select-all'),
            role: 'selectAll',
        }, {
            label: i18n.__('copy'),
            role: 'copy',
        }, {
            label: i18n.__('paste'),
            role: 'paste',
        }];
        settingsWinContextMenu = Menu.buildFromTemplate(template)
    }
}