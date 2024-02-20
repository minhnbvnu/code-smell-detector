function computeHashCode(key)
    {
        switch (typeof key) {
        case "undefined":
            return 0;
        case "object":
            if (!key)
                return 0;
        case "function":
            return key.hashCode();
        case "boolean":
            return key | 0;
        case "number":
            if ((key | 0) == key)
                return key;
            key = "" + key; // Compute string hash of the double. It's the best we can do.
        case "string":
            // source: http://en.wikipedia.org/wiki/Java_hashCode()#Sample_implementations_of_the_java.lang.String_algorithm
            var h = 0;
            var len = key.length;
            for (var index = 0; index < len; index++) {
                h = (((31 * h) | 0) + key.charCodeAt(index)) | 0;
            }
            return h;
        default:
            throw new Error("Internal error: Bad JavaScript value type");
        }
    }