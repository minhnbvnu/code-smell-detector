function systemExtend() {
            var dest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            if (!(0, _utils.isObject)(dest)) {
                return {}
            }
            if (!(0, _utils.isObject)(src)) {
                return dest
            }
            if (src.wrapComponents) {
                (0, _utils.objMap)(src.wrapComponents, function(wrapperFn, key) {
                    var ori = dest.components && dest.components[key];
                    if (ori && Array.isArray(ori)) {
                        dest.components[key] = ori.concat([wrapperFn]);
                        delete src.wrapComponents[key]
                    } else if (ori) {
                        dest.components[key] = [ori, wrapperFn];
                        delete src.wrapComponents[key]
                    }
                });
                if (!(0, _keys2.default)(src.wrapComponents).length) {
                    delete src.wrapComponents
                }
            }
            var statePlugins = dest.statePlugins;
            if ((0, _utils.isObject)(statePlugins)) {
                for (var namespace in statePlugins) {
                    var namespaceObj = statePlugins[namespace];
                    if (!(0, _utils.isObject)(namespaceObj) || !(0, _utils.isObject)(namespaceObj.wrapActions)) {
                        continue
                    }
                    var wrapActions = namespaceObj.wrapActions;
                    for (var actionName in wrapActions) {
                        var action = wrapActions[actionName];
                        if (!Array.isArray(action)) {
                            action = [action];
                            wrapActions[actionName] = action
                        }
                        if (src && src.statePlugins && src.statePlugins[namespace] && src.statePlugins[namespace].wrapActions && src.statePlugins[namespace].wrapActions[actionName]) {
                            src.statePlugins[namespace].wrapActions[actionName] = wrapActions[actionName].concat(src.statePlugins[namespace].wrapActions[actionName])
                        }
                    }
                }
            }
            return (0, _deepExtend2.default)(dest, src)
        }