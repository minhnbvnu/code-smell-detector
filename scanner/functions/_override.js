function _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName])
    }