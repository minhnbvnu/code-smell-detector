function isValidRadix(radix) {
        return !((radix.type === "Literal" && !validRadixValues.has(radix.value)) ||
            (radix.type === "Identifier" && radix.name === "undefined"));
    }