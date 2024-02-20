function selectorSchema(selectorString, allowType, modifiers) {
        const selector = {
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
                type: 'string',
                enum: [selectorString],
            },
        };
        if (modifiers && modifiers.length > 0) {
            selector.modifiers = {
                type: 'array',
                items: {
                    type: 'string',
                    enum: modifiers,
                },
                additionalItems: false,
            };
        }
        if (allowType) {
            selector.types = {
                type: 'array',
                items: {
                    type: 'string',
                    enum: util.getEnumNames(enums_1.TypeModifiers),
                },
                additionalItems: false,
            };
        }
        return [
            {
                type: 'object',
                properties: Object.assign(Object.assign({}, FORMAT_OPTIONS_PROPERTIES), selector),
                required: ['selector', 'format'],
                additionalProperties: false,
            },
        ];
    }