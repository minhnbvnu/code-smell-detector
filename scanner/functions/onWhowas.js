function onWhowas(event) {
        var panel;

        if (event.end)
            return;

        panel = _kiwi.app.panels().active;
        if (event.hostname) {
            panel.addMsg(event.nick, styleText('who', {nick: event.nick, ident: event.ident, host: event.hostname, realname: event.real_name, text: event.msg}), 'whois');
        } else {
            panel.addMsg(event.nick, styleText('whois_notfound', {nick: event.nick, text: translateText('client_models_network_nickname_notfound', [])}), 'whois');
        }
    }