function encodingCommand (ev) {
        var that = this;

        if (ev.params[0]) {
            _kiwi.gateway.setEncoding(null, ev.params[0], function (success) {
                if (success) {
                    that.app.panels().active.addMsg('', styleText('encoding_changed', {text: translateText('client_models_application_encoding_changed', [ev.params[0]])}));
                } else {
                    that.app.panels().active.addMsg('', styleText('encoding_invalid', {text: translateText('client_models_application_encoding_invalid', [ev.params[0]])}));
                }
            });
        } else {
            this.app.panels().active.addMsg('', styleText('client_models_application_encoding_notspecified', {text: translateText('client_models_application_encoding_notspecified')}));
            this.app.panels().active.addMsg('', styleText('client_models_application_encoding_usage', {text: translateText('client_models_application_encoding_usage')}));
        }
    }