function onWhois(event) {
        _kiwi.global.events.emit('whois', {nick: event.nick, network: this.gateway, whois: event})
        .then(function() {
            var logon_date, idle_time = '', panel;

            if (event.end)
                return;

            if (typeof event.idle !== 'undefined') {
                idle_time = secondsToTime(parseInt(event.idle, 10));
                idle_time = idle_time.h.toString().lpad(2, "0") + ':' + idle_time.m.toString().lpad(2, "0") + ':' + idle_time.s.toString().lpad(2, "0");
            }

            panel = _kiwi.app.panels().active;
            if (event.ident) {
                panel.addMsg(event.nick, styleText('whois_ident', {nick: event.nick, ident: event.ident, host: event.hostname, text: event.msg}), 'whois');

            } else if (event.chans) {
                panel.addMsg(event.nick, styleText('whois_channels', {nick: event.nick, text: translateText('client_models_network_channels', [event.chans])}), 'whois');
            } else if (event.irc_server) {
                panel.addMsg(event.nick, styleText('whois_server', {nick: event.nick, text: translateText('client_models_network_server', [event.irc_server, event.server_info])}), 'whois');
            } else if (event.msg) {
                panel.addMsg(event.nick, styleText('whois', {text: event.msg}), 'whois');
            } else if (event.logon) {
                logon_date = new Date();
                logon_date.setTime(event.logon * 1000);
                logon_date = _kiwi.utils.formatDate(logon_date);

                panel.addMsg(event.nick, styleText('whois_idle_and_signon', {nick: event.nick, text: translateText('client_models_network_idle_and_signon', [idle_time, logon_date])}), 'whois');
            } else if (event.away_reason) {
                panel.addMsg(event.nick, styleText('whois_away', {nick: event.nick, text: translateText('client_models_network_away', [event.away_reason])}), 'whois');
            } else {
                panel.addMsg(event.nick, styleText('whois_idle', {nick: event.nick, text: translateText('client_models_network_idle', [idle_time])}), 'whois');
            }
        });
    }