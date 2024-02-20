function defineStyleProperty(style, category, parameter, userValue, defaultValue) {
    let property;
    Object.defineProperty(
        style[category],
        parameter,
        {
            enumerable: true,
            get: () => {
                // != to check for 'undefined' and 'null' value)
                if (property != undefined) { return property; }
                if (userValue != undefined) { return readExpression(userValue, style.context); }
                const dataValue = style.context.featureStyle?.[category]?.[parameter];
                if (dataValue != undefined) { return readExpression(dataValue, style.context); }
                if (defaultValue instanceof Function) {
                    return defaultValue(style.context.properties, style.context);
                }
                return defaultValue;
            },
            set: (v) => {
                property = v;
            },
        });
}