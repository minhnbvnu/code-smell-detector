function _setConfig(cfg) {

            if (!ng.isDefined(cfg)) return;

            ng.forEach(Object.keys(moduleConfig), function(key) {
                if (cfg.hasOwnProperty(key) && key !== 'debug') {
                    moduleConfig[key] = cfg[key] + '';
                }
            });

            // init debug model
            if (cfg.hasOwnProperty('debug')) {
                moduleConfig.debug = !!cfg.debug;
            }

            // init events
            var events = ['onBegin', 'onError', 'onLoad'],
                tmp;
            ng.forEach(events, function(e) {
                tmp = ng.isFunction(cfg[e]) ? cfg[e] : ng.noop;
                moduleConfig[e] = (function(_old) {
                    return function($scope, $e) {
                        _old($e);
                    };
                })(tmp);
            });
        }