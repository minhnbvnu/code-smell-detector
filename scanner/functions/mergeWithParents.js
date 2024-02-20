function mergeWithParents(type, map, parentAttribute) {
        parentAttribute = parentAttribute || "parent";
        var _def = function (id) {
            return id ? map[id] : null;
        };
        var _parent = function (def) {
            return def ? _def(def[parentAttribute]) : null;
        };
        var _one = function (parent, def) {
            if (parent == null) {
                return def;
            }
            else {
                var overrides = ["anchor", "anchors", "cssClass", "connector", "paintStyle", "hoverPaintStyle", "endpoint", "endpoints"];
                if (def.mergeStrategy === "override") {
                    Array.prototype.push.apply(overrides, ["events", "overlays"]);
                }
                var d_1 = merge(parent, def, [], overrides);
                return _one(_parent(parent), d_1);
            }
        };
        var _getDef = function (t) {
            if (t == null) {
                return {};
            }
            if (typeof t === "string") {
                return _def(t);
            }
            else if (t.length) {
                var done = false, i = 0, _dd = void 0;
                while (!done && i < t.length) {
                    _dd = _getDef(t[i]);
                    if (_dd) {
                        done = true;
                    }
                    else {
                        i++;
                    }
                }
                return _dd;
            }
        };
        var d = _getDef(type);
        if (d) {
            return _one(_parent(d), d);
        }
        else {
            return {};
        }
    }