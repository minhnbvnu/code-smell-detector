function OAS3ComponentWrapFactory(Component) {
            return function(Ori, system) {
                return function(props) {
                    if (system && system.specSelectors && system.specSelectors.specJson) {
                        var spec = system.specSelectors.specJson();
                        if (isOAS3(spec)) {
                            return _react2.default.createElement(Component, (0, _extends3.default)({}, props, system, {
                                Ori: Ori
                            }))
                        } else {
                            return _react2.default.createElement(Ori, props)
                        }
                    } else {
                        console.warn("OAS3 wrapper: couldn't get spec");
                        return null
                    }
                }
            }
        }