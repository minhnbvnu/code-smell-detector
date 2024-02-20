function isOptionEnabledOrUndefined(optionName) {
            return (context) => !context.options || !hasProperty(context.options, optionName) || !!context.options[optionName];
        }