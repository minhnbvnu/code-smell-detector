function emitMissingSchemaWarning(ruleName) {
        if (!emitMissingSchemaWarning[`warned-${ruleName}`]) {
            emitMissingSchemaWarning[`warned-${ruleName}`] = true;
            process.emitWarning(`"${ruleName}" rule has options but is missing the "meta.schema" property and will stop working in ESLint v9. Please add a schema: https://eslint.org/docs/latest/extend/custom-rules#options-schemas`, "DeprecationWarning");
        }
    }