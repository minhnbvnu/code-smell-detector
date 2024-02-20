function Architect(config) {
    var app = this;
    app.config = config;
    app.packages = {};
    app.pluginToPackage = {};
    
    var isAdditionalMode;
    var services = app.services = {
        hub: {
            on: function (name, callback) {
                app.on(name, callback);
            }
        }
    };

    // Check the config
    var sortedPlugins = checkConfig(config);

    var destructors = [];
    var recur = 0, callnext, ready;
    function startPlugins(additional) {
        var plugin = sortedPlugins.shift();
        if (!plugin) {
            ready = true;
            return app.emit(additional ? "ready-additional" : "ready", app);
        }

        var imports = {};
        if (plugin.consumes) {
            plugin.consumes.forEach(function (name) {
                imports[name] = services[name];
            });
        }
        
        var m = /^plugins\/([^\/]+)|\/plugins\/[^\/]+\/([^\/]+)/.exec(plugin.packagePath);
        var packageName = m && (m[1] || m[2]);
        if (!app.packages[packageName]) app.packages[packageName] = [];
        
        if (DEBUG) {
            recur++;
            plugin.setup(plugin, imports, register);
            
            while (callnext && recur <= 1) {
                callnext = false;
                startPlugins(additional);
            }
            recur--;
        }
        else {
            try {
                recur++;
                plugin.setup(plugin, imports, register);
            } catch (e) {
                e.plugin = plugin;
                app.emit("error", e);
                throw e;
            } finally {
                while (callnext && recur <= 1) {
                    callnext = false;
                    startPlugins(additional);
                }
                recur--;
            }
        }
        
        function register(err, provided) {
            if (err) { return app.emit("error", err); }
            plugin.provides.forEach(function (name) {
                if (!provided.hasOwnProperty(name)) {
                    var err = new Error("Plugin failed to provide " + name + " service. " + JSON.stringify(plugin));
                    err.plugin = plugin;
                    return app.emit("error", err);
                }
                services[name] = provided[name];
                app.pluginToPackage[name] = {
                    path: plugin.packagePath,
                    package: packageName,
                    version: plugin.version,
                    isAdditionalMode: isAdditionalMode
                };
                app.packages[packageName].push(name);
                
                app.emit("service", name, services[name], plugin);
            });
            if (provided && provided.hasOwnProperty("onDestroy"))
                destructors.push(provided.onDestroy);

            app.emit("plugin", plugin);
            
            if (recur) return (callnext = true);
            startPlugins(additional);
        }
    }

    // Give createApp some time to subscribe to our "ready" event
    (typeof process === "object" ? process.nextTick : setTimeout)(startPlugins);

    this.loadAdditionalPlugins = function(additionalConfig, callback){
        isAdditionalMode = true;
        
        exports.resolveConfig(additionalConfig, function (err, additionalConfig) {
            if (err) return callback(err);
            
            app.once(ready ? "ready-additional" : "ready", function(app){
                callback(null, app);
            }); // What about error state?
            
            // Check the config - hopefully this works
            var _sortedPlugins = checkConfig(additionalConfig, function(name){
                return services[name];
            });
            
            if (ready) {
                sortedPlugins = _sortedPlugins;
                // Start Loading additional plugins
                startPlugins(true);
            }
            else {
                _sortedPlugins.forEach(function(item){
                    sortedPlugins.push(item);
                });
            }
        });
    }

    this.destroy = function() {
        destructors.forEach(function(destroy) {
            destroy();
        });

        destructors = [];
    };
}