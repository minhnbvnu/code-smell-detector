function lookupThreeConstructorName(obj) {
    var name = obj.constructor.name;
    if (THREE[name] !== undefined) {
        return name;
    }
    // Check against our custom classes:
    if (customModelsLut[name] !== undefined) {
        return customModelsLut[name];
    }

    // Assume constructor name is minified, try a reverse lookup
    if (!threeReverseLut) {
        // Build reverse LUT and store it
        threeReverseLut = Object.keys(THREE).reduce(function(res, key) {
            var value = THREE[key];
            if (!!value.prototype && !!value.prototype.constructor.name) {
                res[value.prototype.constructor.name] = key;
            }
            return res;
        }, {});
    }
    return threeReverseLut[name];
}