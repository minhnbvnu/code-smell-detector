function validateConfigSchema(config, source = null) {
        validateSchema = validateSchema || ajv.compile(configSchema);
        if (!validateSchema(config)) {
            throw new Error(`ESLint configuration in ${source} is invalid:\n${formatErrors(validateSchema.errors)}`);
        }
        if (Object.hasOwnProperty.call(config, "ecmaFeatures")) {
            emitDeprecationWarning(source, "ESLINT_LEGACY_ECMAFEATURES");
        }
    }