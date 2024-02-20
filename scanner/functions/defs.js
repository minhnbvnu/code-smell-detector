function defs(name) {
        /*global console*/
        var that = this;
        if (arguments.length === 2) {
            var def = arguments[1];
            if (typeof def === 'string') {
                if (def.charAt(0) === '+') {
                    defs[name] = (0, projString_1.default)(arguments[1]);
                }
                else {
                    defs[name] = (0, wkt_parser_1.default)(arguments[1]);
                }
            }
            else {
                defs[name] = def;
            }
        }
        else if (arguments.length === 1) {
            if (Array.isArray(name)) {
                return name.map(function (v) {
                    if (Array.isArray(v)) {
                        defs.apply(that, v);
                    }
                    else {
                        defs(v);
                    }
                });
            }
            else if (typeof name === 'string') {
                if (name in defs) {
                    return defs[name];
                }
            }
            else if ('EPSG' in name) {
                defs['EPSG:' + name.EPSG] = name;
            }
            else if ('ESRI' in name) {
                defs['ESRI:' + name.ESRI] = name;
            }
            else if ('IAU2000' in name) {
                defs['IAU2000:' + name.IAU2000] = name;
            }
            else {
                console.log(name);
            }
            return;
        }
    }