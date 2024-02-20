function validatePlugin(pName) {
                // User must only provide the plugin name, not the solium plugin prefix string
                let plugin, pNameWithoutPrefix = pName;
                pName = ruleLoader.constants.SOLIUM_PLUGIN_PREFIX + pName;

                try {
                    plugin = require(pName);
                } catch (e) {
                    if (e.code === "MODULE_NOT_FOUND") {
                        // Plugin is not installed in Solium's scope
                        throw new Error(
                            "Oops! The Plugin \"" + pName + "\" was not found." +
							"\n\nPlease make sure that it is installed globally by running \"npm install -g " + pName + "\""
                        );
                    }

                    // Some other error
                    throw new Error(
                        "Oops! An error occured while trying to load the plugin \"" +
						pName + "\"." + e.message +
						"\n\nPlease see http://solium.readthedocs.io/en/latest/user-guide.html#plugins for plugin usage."
                    );
                }

                // If plugin was loaded successfully, validate it using schema.
                if (!isAValidPlugin(plugin)) {
                    throw new Error(
                        "\"" + pName + "\" is not a valid plugin." +
						"\nPlease see http://solium.readthedocs.io/en/latest/developer-guide.html#developing-a-plugin" + 
						" for plugin development. AJV Message:\n" +	util.inspect(isAValidPlugin.errors)
                    );
                }

                // Finally, load plugin's default rule configuration into ruleConfigs
                Object.assign(ruleConfigs, ruleLoader.resolvePluginConfig(pNameWithoutPrefix, plugin));
            }