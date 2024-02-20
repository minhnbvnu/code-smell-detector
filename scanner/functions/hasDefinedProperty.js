function hasDefinedProperty(obj) {
        if (typeof obj === "object" && obj !== null) {
            for (const key in obj) {
                if (typeof obj[key] !== "undefined") {
                    return true;
                }
            }
        }
        return false;
    }