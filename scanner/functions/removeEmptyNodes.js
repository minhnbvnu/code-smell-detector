function removeEmptyNodes(obj) {
        let hasEmptyNodes = false;
        Object.entries(obj).forEach(([key, value]) => {
            if (Object.keys(value).length === 0) {
                delete obj[key];
                hasEmptyNodes = true;
            } else if (typeof value === 'object') {
                obj[key] = removeEmptyNodes(value);
            }
        })
        return hasEmptyNodes ? removeEmptyNodes(obj) : obj;
    }