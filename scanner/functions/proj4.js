function proj4(fromProj, toProj, coord) {
        fromProj = checkProj(fromProj);
        var single = false;
        var obj;
        if (typeof toProj === 'undefined') {
            toProj = fromProj;
            fromProj = wgs84;
            single = true;
        }
        else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
            coord = toProj;
            toProj = fromProj;
            fromProj = wgs84;
            single = true;
        }
        toProj = checkProj(toProj);
        if (coord) {
            return transformer(fromProj, toProj, coord);
        }
        else {
            obj = {
                forward: function (coords, enforceAxis) {
                    return transformer(fromProj, toProj, coords, enforceAxis);
                },
                inverse: function (coords, enforceAxis) {
                    return transformer(toProj, fromProj, coords, enforceAxis);
                }
            };
            if (single) {
                obj.oProj = toProj;
            }
            return obj;
        }
    }