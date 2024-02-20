function serverCommand (ev) {
        var that = this,
            server, port, ssl, password, nick,
            tmp;

        // If no server address given, show the new connection dialog
        if (!ev.params[0]) {
            tmp = new _kiwi.view.MenuBox(_kiwi.global.i18n.translate('client_models_application_connection_create').fetch());
            tmp.addItem('new_connection', new _kiwi.model.NewConnection().view.$el);
            tmp.show();

            // Center screen the dialog
            tmp.$el.offset({
                top: (this.app.view.$el.height() / 2) - (tmp.$el.height() / 2),
                left: (this.app.view.$el.width() / 2) - (tmp.$el.width() / 2)
            });

            return;
        }

        // Port given in 'host:port' format and no specific port given after a space
        if (ev.params[0].indexOf(':') > 0) {
            tmp = ev.params[0].split(':');
            server = tmp[0];
            port = tmp[1];

            password = ev.params[1] || undefined;

        } else {
            // Server + port given as 'host port'
            server = ev.params[0];
            port = ev.params[1] || 6667;

            password = ev.params[2] || undefined;
        }

        // + in the port means SSL
        if (port.toString()[0] === '+') {
            ssl = true;
            port = parseInt(port.substring(1), 10);
        } else {
            ssl = false;
        }

        // Default port if one wasn't found
        port = port || 6667;

        // Use the same nick as we currently have
        nick = this.app.connections.active_connection.get('nick');

        this.app.panels().active.addMsg('', styleText('server_connecting', {text: translateText('client_models_application_connection_connecting', [server, port.toString()])}));

        _kiwi.gateway.newConnection({
            nick: nick,
            host: server,
            port: port,
            ssl: ssl,
            password: password
        }, function(err, new_connection) {
            var translated_err;

            if (err) {
                translated_err = translateText('client_models_application_connection_error', [server, port.toString(), err.toString()]);
                that.app.panels().active.addMsg('', styleText('server_connecting_error', {text: translated_err}));
            }
        });
    }