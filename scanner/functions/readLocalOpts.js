function readLocalOpts() {
        var cookieOpt = me.getPreferences('autotypeset');
        utils.extend(me.options.autotypeset, cookieOpt);
    }