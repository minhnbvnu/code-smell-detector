function isTrailingCommaAllowed(lastItem) {
        return !(lastItem.type === "RestElement" ||
            lastItem.type === "RestProperty" ||
            lastItem.type === "ExperimentalRestProperty");
    }