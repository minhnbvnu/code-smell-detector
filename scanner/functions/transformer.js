function transformer(from, to, coords, enforceAxis) {
        var transformedArray, out, keys;
        if (Array.isArray(coords)) {
            transformedArray = (0, transform_1.default)(from, to, coords, enforceAxis) || { x: NaN, y: NaN };
            if (coords.length > 2) {
                if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
                    if (typeof transformedArray.z === 'number') {
                        return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
                    }
                    else {
                        return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
                    }
                }
                else {
                    return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
                }
            }
            else {
                return [transformedArray.x, transformedArray.y];
            }
        }
        else {
            out = (0, transform_1.default)(from, to, coords, enforceAxis);
            keys = Object.keys(coords);
            if (keys.length === 2) {
                return out;
            }
            keys.forEach(function (key) {
                if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
                    if (key === 'x' || key === 'y' || key === 'z') {
                        return;
                    }
                }
                else {
                    if (key === 'x' || key === 'y') {
                        return;
                    }
                }
                out[key] = coords[key];
            });
            return out;
        }
    }