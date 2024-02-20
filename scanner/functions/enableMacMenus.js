function enableMacMenus() {
    // Create menu entries if running on Mac
    if (process.platform === 'darwin') {
        Menu.setApplicationMenu(Menu.buildFromTemplate([
            {
                label: app.getName(),
                submenu: [
                    { role: 'about', label: 'About' },
                    { type: 'separator'},
                    { role: 'quit', label: 'Quit' }
                ]
            },
            { role: 'editMenu' },
            { role: 'windowMenu' }
        ]));
    }
}