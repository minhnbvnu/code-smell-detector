function isJsonEqual(a, b) {
            return a === b || typeof a === "object" && a !== null && typeof b === "object" && b !== null && equalOwnProperties(a, b, isJsonEqual);
        }