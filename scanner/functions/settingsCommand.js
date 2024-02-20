function settingsCommand (ev) {
        var settings = _kiwi.model.Applet.loadOnce('kiwi_settings');
        settings.view.show();
    }