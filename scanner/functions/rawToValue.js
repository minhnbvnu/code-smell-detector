function rawToValue(app, args, value, old) {
    switch (args.type) {
        case 'boolean':
            return !!value;
        case 'number':
            if (typeof value === 'number') {
                return value;
            } else if (typeof value === 'string') {
                const v = parseInt(value, 10);
                if (isNaN(v)) return null;
                return v;
            } else if (typeof value === 'boolean') {
                return 0 + value;
            }
            return null;
        case 'json': {
            const result = {};

            if (Array.isArray(args.schema)) {
                if (!value || typeof value !== 'object') {
                    value = {};
                }

                for (let i = 0; i < args.schema.length; i++) {
                    const field = args.schema[i];
                    if (!field.name) continue;

                    if (field.array) {
                        result[field.name] = [];

                        const arr = Array.isArray(value[field.name]) ? value[field.name] : [];

                        for (let j = 0; j < arr.length; j++) {
                            result[field.name].push(rawToValue(app, field, arr[j]));
                        }
                    } else {
                        // use the value of the field as it's passed into rawToValue otherwise
                        // use the default field value
                        const val = value.hasOwnProperty(field.name) ? value[field.name] : field.default;
                        result[field.name] = rawToValue(app, field, val);
                    }
                }
            }

            return result;
        }
        case 'asset':
            if (value instanceof Asset) {
                return value;
            } else if (typeof value === 'number') {
                return app.assets.get(value) || null;
            } else if (typeof value === 'string') {
                return app.assets.get(parseInt(value, 10)) || null;
            }
            return null;
        case 'entity':
            if (value instanceof GraphNode) {
                return value;
            } else if (typeof value === 'string') {
                return app.getEntityFromIndex(value);
            }
            return null;
        case 'rgb':
        case 'rgba':
            if (value instanceof Color) {
                if (old instanceof Color) {
                    old.copy(value);
                    return old;
                }
                return value.clone();
            } else if (value instanceof Array && value.length >= 3 && value.length <= 4) {
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] !== 'number')
                        return null;
                }
                if (!old) old = new Color();

                old.r = value[0];
                old.g = value[1];
                old.b = value[2];
                old.a = (value.length === 3) ? 1 : value[3];

                return old;
            } else if (typeof value === 'string' && /#([0-9abcdef]{2}){3,4}/i.test(value)) {
                if (!old)
                    old = new Color();

                old.fromString(value);
                return old;
            }
            return null;
        case 'vec2':
        case 'vec3':
        case 'vec4': {
            const len = parseInt(args.type.slice(3), 10);
            const vecType = vecLookup[len];

            if (value instanceof vecType) {
                if (old instanceof vecType) {
                    old.copy(value);
                    return old;
                }
                return value.clone();
            } else if (value instanceof Array && value.length === len) {
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] !== 'number')
                        return null;
                }
                if (!old) old = new vecType();

                for (let i = 0; i < len; i++)
                    old[components[i]] = value[i];

                return old;
            }
            return null;
        }
        case 'curve':
            if (value) {
                let curve;
                if (value instanceof Curve || value instanceof CurveSet) {
                    curve = value.clone();
                } else {
                    const CurveType = value.keys[0] instanceof Array ? CurveSet : Curve;
                    curve = new CurveType(value.keys);
                    curve.type = value.type;
                }
                return curve;
            }
            break;
    }

    return value;
}