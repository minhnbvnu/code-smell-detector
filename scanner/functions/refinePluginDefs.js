function refinePluginDefs(pluginInputs) {
        var plugins = [];
        for (var _i = 0, pluginInputs_1 = pluginInputs; _i < pluginInputs_1.length; _i++) {
            var pluginInput = pluginInputs_1[_i];
            if (typeof pluginInput === 'string') {
                var globalName = 'FullCalendar' + capitaliseFirstLetter(pluginInput);
                if (!window[globalName]) {
                    console.warn('Plugin file not loaded for ' + pluginInput);
                }
                else {
                    plugins.push(window[globalName].default); // is an ES6 module
                }
            }
            else {
                plugins.push(pluginInput);
            }
        }
        return INTERNAL_PLUGINS.concat(plugins);
    }