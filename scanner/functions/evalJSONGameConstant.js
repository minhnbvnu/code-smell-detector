function evalJSONGameConstant(json) {
    if (typeof json === 'number' || typeof json === 'string' || typeof json === 'boolean') {
        // Raw values
        return json;
    }

    switch (json.type) {
    case 'nil':
        return undefined;
        
    case 'raw':
        if (json.url !== undefined) {
            // We only allow raw at top level because otherwise we'd have to traverse
            // constants during loading or load during constant evaluation, and would also
            // have to deal with this mess from the GUI.
            throw 'Raw values with URLs only permitted for top-level constants';
        }
        
        // Replace null with undefined, but otherwise directly read the value
        return nullToUndefined(json.value);
        
    case 'number':
        if (typeof json.value === 'number') {
            return json.value;
        } else {
            return $parse(json.value.trim()).result;
        }
        break;
        
    case 'boolean': return (json.value === true) || (json.value === 'true');

    case 'string': return json.value;

    case 'xy':
        return {x: evalJSONGameConstant(json.value.x),
                y: evalJSONGameConstant(json.value.y)};

    case 'xz':
        return {x: evalJSONGameConstant(json.value.x),
                z: evalJSONGameConstant(json.value.z)};
        
    case 'xyz':
        return {x: evalJSONGameConstant(json.value.x),
                y: evalJSONGameConstant(json.value.y),
                z: evalJSONGameConstant(json.value.z)};

    case 'hsv':
        return {h: evalJSONGameConstant(json.value.h),
                s: evalJSONGameConstant(json.value.s),
                v: evalJSONGameConstant(json.value.v)};
        
    case 'hsva':
        return {h: evalJSONGameConstant(json.value.h),
                s: evalJSONGameConstant(json.value.s),
                v: evalJSONGameConstant(json.value.v),
                a: evalJSONGameConstant(json.value.a)};
        
    case 'rgb':
        if (typeof json.value === 'object') {
            return {r: evalJSONGameConstant(json.value.r),
                    g: evalJSONGameConstant(json.value.g),
                    b: evalJSONGameConstant(json.value.b)};
        } else if ((typeof json.value === 'string') && (json.value[0] === '#')) {
            // Parse color
            const c = parseHexColor(json.value.substring(1));
            return {r: c.r, g: c.g, b: c.b};
        } else {
            throw 'Illegal rgb value: ' + json.value;
        }

    case 'rgba':
        if (typeof json.value === 'object') {
            return {r: evalJSONGameConstant(json.value.r),
                    g: evalJSONGameConstant(json.value.g),
                    b: evalJSONGameConstant(json.value.b),
                    a: evalJSONGameConstant(json.value.a)};
        } else if (typeof json.value === 'string' && json.value[0] === '#') {
            // Parse color
            return parseHexColor(json.value.substring(1));
        } else {
            throw 'Illegal rgba value: ' + json.value;
        }

    case 'distribution':
        {
            if (typeof json.value !== 'object') {
                throw 'Distribution constant must have an object {} value field';
            }
            const keys = Object.keys(json.value);
            const result = {};
            for (let i = 0; i < keys.length; ++i) {
                const key = keys[i];
                result[key] = evalJSONGameConstant(json.value[key]);
                if (typeof result[key] !== 'number') {
                    throw 'Value for ' + key + ' of distribution constant must be a number';
                }
            }
            return result;
        }

    case 'object':
        {
            if (typeof json.value !== 'object') {
                throw 'Object constant must have an object {} value field';
            }
            const keys = Object.keys(json.value);
            const result = {};
            for (let i = 0; i < keys.length; ++i) {
                const key = keys[i];
                result[key] = evalJSONGameConstant(json.value[key]);
            }
            return result;
        }

    case 'array':
        {
            if (! Array.isArray(json.value)) {
                throw 'Array constant must have an array [] value field';
            }
            const result = [];
            for (let i = 0; i < json.value.length; ++i) {
                result.push(evalJSONGameConstant(json.value[i]));
            }
            return result;
        }

    case 'reference':
        {
            throw 'References only permitted for top-level constants';
            return undefined;
        }

    default:
        throw 'Unrecognized data type: "' + json.type + '" in constant definition ' + JSON.stringify(json);
    }
}