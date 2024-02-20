function prefixed(obj, property) {
            var prefix, prop;
            var camelProp = property[0].toUpperCase() + property.slice(1);
            var i = 0;
            while (i < VENDOR_PREFIXES.length) {
                prefix = VENDOR_PREFIXES[i];
                prop = (prefix) ? prefix + camelProp : property;
                if (prop in obj) {
                    return prop;
                }
                i++;
            }
            return undefined;
        }