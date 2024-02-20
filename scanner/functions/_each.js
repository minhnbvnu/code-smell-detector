function _each(object, callback, args) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || Object.prototype.toString.apply(object) !== '[object Array]' || typeof object === "function";
    
        if (args) {
            if (isObj) {
                for (name in object) {
                    if (callback.apply(object[name], args) === false) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if (callback.apply(object[i++], args) === false) {
                        break;
                    }
                }
            }
    
        // A special, fast, case for the most common use of each
        } else {
            if (isObj) {
                for (name in object) {
                    if (callback.call(object[name], name, object[name]) === false) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if (callback.call(object[i], i, object[i++]) === false) {
                        break;
                    }
                }
            }
        }
    
        return object;
    }