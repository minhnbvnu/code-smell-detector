function handleImportSettings(event) {
    const onFileLoaded = (content) => {
        ipcRenderer.send('renderer-to-main', JSON.stringify({
            'type': 'applyUserSettings',
            'settings': content,
        }));
    };

    const file = event.currentTarget.files[0];
    if (file) {
        if (this.getExtension(file.name) !== 'json') {
            throw new Error(i18n.__('options_settings_import_wrong_file_extension'));
        }
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = function (evt) {
            onFileLoaded(evt.target.result);
        };
        reader.onerror = function () {
            throw new Error(i18n.__('options_settings_import_error'));
        };
    }
}