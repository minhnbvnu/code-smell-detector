function defaultForType(type) {
                const def = {
                    [DefaultValuesForTypeKey.BOOLEAN]: true,
                    [DefaultValuesForTypeKey.STRING]: '',
                    [DefaultValuesForTypeKey.NUMBER]: undefined,
                    [DefaultValuesForTypeKey.ARRAY]: []
                };
                return def[type];
            }