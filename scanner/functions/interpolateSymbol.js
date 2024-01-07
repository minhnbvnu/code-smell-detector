function interpolateSymbol(geo, symbol) {
        var result;
        if (Array.isArray(symbol)) {
            result = [];
            for (var i = 0; i < symbol.length; i++) {
                result.push(interpolateSymbol(symbol[i]));
            }
            return result;
        }
        result = {};
        for (var p in symbol) {
            if (symbol.hasOwnProperty(p)) {
                if (maptalks.MapboxUtil.isFunctionDefinition(symbol[p])) {
                    if (!geo.getMap()) {
                        result[p] = null;
                    } else {
                        result[p] = maptalks.MapboxUtil.interpolated(symbol[p])(geo.getMap().getZoom(), geo.getProperties());
                    }
                } else {
                    result[p] = symbol[p];
                }
            }
        }
        return result;
    }