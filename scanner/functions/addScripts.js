function addScripts(vars, debug) {
    if (!debug) {
        vars.scripts.push(['assets/kiwi.min.js', 'assets/libs/engine.io.bundle.min.js']);
        return;
    }

    vars.scripts = vars.scripts.concat([
        [
            'src/app.js',
            'assets/libs/engine.io.js',
            'assets/libs/engine.io.tools.js'
        ],
        [
            'src/models/application.js',
            'src/models/gateway.js'
        ],
        [
            'src/models/newconnection.js',
            'src/models/panellist.js',
            'src/models/networkpanellist.js',
            'src/models/panel.js',
            'src/models/member.js',
            'src/models/memberlist.js',
            'src/models/ignorelist.js',
            'src/models/network.js',
            'src/models/channelinfo.js'
        ],

        [
            'src/models/channel.js',
            'src/models/applet.js'
        ],

        [
            'src/models/query.js',
            'src/models/server.js',     // Depends on models/channel.js
            'src/models/pluginmanager.js',
            'src/models/datastore.js'
        ],

        // Some views extend these, so make sure they're loaded beforehand
        [
            'src/views/panel.js'
        ],

        [
            'src/views/channel.js',
            'src/views/applet.js',
            'src/views/application.js',
            'src/views/apptoolbar.js',
            'src/views/controlbox.js',
            'src/views/autocomplete.js',
            'src/views/favicon.js',
            'src/views/mediamessage.js',
            'src/views/member.js',
            'src/views/memberlist.js',
            'src/views/menubox.js',
            'src/views/networktabs.js',
            'src/views/nickchangebox.js',
            'src/views/resizehandler.js',
            'src/views/serverselect.js',
            'src/views/statusmessage.js',
            'src/views/tabs.js',
            'src/views/topicbar.js',
            'src/views/userbox.js',
            'src/views/channeltools.js',
            'src/views/channelinfo.js',
            'src/views/rightbar.js',
            'src/views/notification.js'
        ],

        [
            'src/misc/clientuicommands.js'
        ],

        [
            'src/applets/settings.js',
            'src/applets/chanlist.js',
            'src/applets/scripteditor.js',
            'src/applets/startup.js'
        ]
    ]);

    // Load any helpers we may have
    var helpers_path = global.config.public_http + 'src/helpers/';
    var helpers_sources = fs.readdirSync(helpers_path)
        .map(function(file){
            return 'src/helpers/' + file;
        });

    vars.scripts = vars.scripts.concat(helpers_sources);
}