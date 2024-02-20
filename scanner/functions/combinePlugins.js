function combinePlugins(plugins, toolbox) {
            if ((0, _utils.isObject)(plugins) && !(0, _utils.isArray)(plugins)) return plugins;
            if ((0, _utils.isFunc)(plugins)) return combinePlugins(plugins(toolbox), toolbox);
            if ((0, _utils.isArray)(plugins)) {
                return plugins.map(function(plugin) {
                    return combinePlugins(plugin, toolbox)
                }).reduce(systemExtend, {})
            }
            return {}
        }