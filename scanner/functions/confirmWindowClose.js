function confirmWindowClose() {
    // Don't show confirmation message on app relaunch for update
    if (settings.isUpdateRelaunch()) {
        settings.setUpdateRelaunch(false);
        app.quit();
        return;
    }
    // Check if we have previously saved setting
    const quitOnCloseWindow = settings.isQuitOnCloseWindow();
    if (quitOnCloseWindow === 1) {
        log.info('Saved setting - quit application');

        mainWindow.forceClose = true;
        app.quit();

        return;
    }
    if (quitOnCloseWindow === 0) {
        log.info('Saved setting - close window');

        mainWindow.forceClose = true;
        mainWindow.close();

        return;
    }

    dialog.showMessageBox({
        type: 'question',
        message: i18n.__('window_close_dialog_message.message'),
        detail: i18n.__('window_close_dialog_detail.message'),
        checkboxLabel: i18n.__('window_close_dialog_checkbox.message'),
        buttons: [
            i18n.__('window_close_dialog_no.message'),
            i18n.__('window_close_dialog_yes.message'),
            i18n.__('window_close_dialog_cancel.message'),
        ],
        defaultId: 1,
    }).then((result) => {
        if (result.response === 2) {
            log.info('Confirmation cancelled');
            return;
        }

        const keepAppRunning = result.response === 1;

        if (result.checkboxChecked) {
            settings.changeQuitOnCloseWindow(keepAppRunning ? 0 : 1);
        }

        if (!keepAppRunning) {
            log.info('Force quit application on close window');
            app.exit();
        } else {
            log.info('Close window');
            mainWindow.forceClose = true;
            mainWindow.close();
        }
    });
}