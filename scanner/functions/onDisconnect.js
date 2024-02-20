function onDisconnect(event) {
        this.set('connected', false);

        $.each(this.panels.models, function (index, panel) {
            if (!panel.isApplet()) {
                panel.addMsg('', styleText('network_disconnected', {text: translateText('client_models_network_disconnected', [])}), 'action quit');
            }
        });
    }