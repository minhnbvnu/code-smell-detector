function callAfterLoad(plugins, system) {
            var _this6 = this;
            var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                hasLoaded = _ref3.hasLoaded;
            var calledSomething = hasLoaded;
            if ((0, _utils.isObject)(plugins) && !(0, _utils.isArray)(plugins)) {
                if (typeof plugins.afterLoad === "function") {
                    calledSomething = true;
                    wrapWithTryCatch(plugins.afterLoad).call(this, system)
                }
            }
            if ((0, _utils.isFunc)(plugins)) return callAfterLoad.call(this, plugins(system), system, {
                hasLoaded: calledSomething
            });
            if ((0, _utils.isArray)(plugins)) {
                return plugins.map(function(plugin) {
                    return callAfterLoad.call(_this6, plugin, system, {
                        hasLoaded: calledSomething
                    })
                })
            }
            return calledSomething
        }