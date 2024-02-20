function checkMovableLimits(base) {
            var symbol = (NodeUtil_js_1.default.isType(base, 'mo') ? NodeUtil_js_1.default.getForm(base) : null);
            if (NodeUtil_js_1.default.getProperty(base, 'movablelimits') || (symbol && symbol[3] && symbol[3].movablelimits)) {
                NodeUtil_js_1.default.setProperties(base, { movablelimits: false });
            }
        }