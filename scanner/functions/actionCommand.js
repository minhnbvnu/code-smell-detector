function actionCommand (ev) {
        if (this.app.panels().active.isServer()) {
            return;
        }

        var panel = this.app.panels().active;
        panel.addMsg('', styleText('action', {nick: this.app.connections.active_connection.get('nick'), text: ev.params.join(' ')}), 'action');
        this.app.connections.active_connection.gateway.action(panel.get('name'), ev.params.join(' '));
    }