function appletCommand (ev) {
        if (!ev.params[0]) return;

        var panel;

        if (ev.params[1]) {
            // Url and name given
            panel = panel.loadFromUrl(ev.params[0], ev.params[1]);
        } else {
            // Load a pre-loaded applet
            panel = _kiwi.model.Applet.loadOnce(ev.params[0]);
            if (!panel) {
                this.app.panels().server.addMsg('', styleText('applet_notfound', {text: translateText('client_models_application_applet_notfound', [ev.params[0]])}));
                return;
            }
        }

        panel.view.show();
    }