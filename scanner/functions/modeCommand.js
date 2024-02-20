function modeCommand (ev) {
        var params, for_channel, network,
            panel = this.app.panels().active;

        network = panel.get('network');
        if (!network) {
            return;
        }

        // Use the specified channel is one is given..
        if (network.isChannelName(ev.params[0])) {
            for_channel = ev.params[0];
            params = ev.params.slice(1).join(' ');

        // Use the current channel..
        } else if(panel.isChannel()) {
            for_channel = panel.get('name');
            params = ev.params.join(' ');

        // Nothing to get a mode for..
        } else {
            return;
        }

        // Due to a flaw on the server-side we can't actually get modes for channels
        // that we are not joined.
        if (!params) {
            network.gateway.on('channel_info', function onChanInfo(event) {
                if (event.channel.toLowerCase() !== for_channel.toLowerCase() || typeof event.modes === 'undefined') {
                    return;
                }

                // No need to listen any more
                network.gateway.off('channel_info', onChanInfo);

                // Convert the modes into human readable format (+nt -xyz)
                var mode_string = _.chain(event.modes)
                    .reduce(function(res, mode) {
                        var type = mode.mode[0]==='-'?'-':'+';
                        res[type].push(mode.mode.substr(1));
                        return res;
                    }, {'+':[], '-':[]})
                    .reduce(function(res, modes, type) {
                        if (modes.length > 0) res += type + modes.join('') + ' ';
                        return res;
                    }, '')
                    .value();
                    
                panel.addMsg('', event.channel + ' ' + mode_string);
            });
        }

        this.app.connections.active_connection.gateway.raw('MODE ' + for_channel + ' ' + params);
    }