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