function hasBinary(obj, toJSON) {
        if (!obj || _typeof(obj) !== "object") {
            return false;
        }

        if (Array.isArray(obj)) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (hasBinary(obj[i])) {
                    return true;
                }
            }

            return false;
        }

        if (isBinary(obj)) {
            return true;
        }

        if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
            return hasBinary(obj.toJSON(), true);
        }

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
                return true;
            }
        }

        return false;
    }