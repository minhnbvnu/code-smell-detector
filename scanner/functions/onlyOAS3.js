function onlyOAS3(selector) {
            return function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key]
                }
                return function(system) {
                    var spec = system.getSystem().specSelectors.specJson();
                    if ((0, _helpers.isOAS3)(spec)) {
                        return selector.apply(undefined, args)
                    } else {
                        return null
                    }
                }
            }
        }