function selectorsSchema() {
        return {
            type: 'object',
            properties: Object.assign(Object.assign({}, FORMAT_OPTIONS_PROPERTIES), {
                filter: {
                    oneOf: [
                        {
                            type: 'string',
                            minLength: 1,
                        },
                        MATCH_REGEX_SCHEMA,
                    ],
                },
                selector: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: [
                            ...util.getEnumNames(enums_1.MetaSelectors),
                            ...util.getEnumNames(enums_1.Selectors),
                        ],
                    },
                    additionalItems: false,
                },
                modifiers: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: util.getEnumNames(enums_1.Modifiers),
                    },
                    additionalItems: false,
                },
                types: {
                    type: 'array',
                    items: {
                        type: 'string',
                        enum: util.getEnumNames(enums_1.TypeModifiers),
                    },
                    additionalItems: false,
                },
            }),
            required: ['selector', 'format'],
            additionalProperties: false,
        };
    }