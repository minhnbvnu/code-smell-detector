function getRuleOptionsSchema(rule) {
        if (!rule) {
            return null;
        }
        const schema = rule.schema || rule.meta && rule.meta.schema;
        // Given a tuple of schemas, insert warning level at the beginning
        if (Array.isArray(schema)) {
            if (schema.length) {
                return {
                    type: "array",
                    items: schema,
                    minItems: 0,
                    maxItems: schema.length
                };
            }
            return {
                type: "array",
                minItems: 0,
                maxItems: 0
            };
        }
        // Given a full schema, leave it alone
        return schema || null;
    }