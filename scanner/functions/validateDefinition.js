function validateDefinition(name, strategy) {
        let hasSchema = false;
        if (strategy.schema) {
            if (typeof strategy.schema === "object") {
                hasSchema = true;
            }
            else {
                throw new TypeError("Schema must be an object.");
            }
        }
        if (typeof strategy.merge === "string") {
            if (!(strategy.merge in MergeStrategy)) {
                throw new TypeError(`Definition for key "${name}" missing valid merge strategy.`);
            }
        }
        else if (!hasSchema && typeof strategy.merge !== "function") {
            throw new TypeError(`Definition for key "${name}" must have a merge property.`);
        }
        if (typeof strategy.validate === "string") {
            if (!(strategy.validate in ValidationStrategy)) {
                throw new TypeError(`Definition for key "${name}" missing valid validation strategy.`);
            }
        }
        else if (!hasSchema && typeof strategy.validate !== "function") {
            throw new TypeError(`Definition for key "${name}" must have a validate() method.`);
        }
    }