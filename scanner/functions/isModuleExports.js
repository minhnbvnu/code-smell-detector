function isModuleExports(pattern) {
        if (pattern.type === "MemberExpression" && pattern.object.type === "Identifier" && pattern.object.name === "module") {
            // module.exports
            if (pattern.property.type === "Identifier" && pattern.property.name === "exports") {
                return true;
            }
            // module["exports"]
            if (pattern.property.type === "Literal" && pattern.property.value === "exports") {
                return true;
            }
        }
        return false;
    }