function readExpression(property, ctx) {
    if (property != undefined) {
        if (property.expression) {
            return property.expression.evaluate(ctx);
        } else if (property.stops) {
            for (let i = property.stops.length - 1; i >= 0; i--) {
                const stop = property.stops[i];

                if (ctx.zoom >= stop[0]) {
                    return stop[1];
                }
            }
            return property.stops[0][1];
        }
        if (typeof property === 'string' || property instanceof String) {
            property = property.replace(/\{(.+?)\}/g, (a, b) => (ctx.properties[b] || '')).trim();
        }
        if (property instanceof Function) {
            // TOBREAK: Pass the current `context` as a unique parameter.
            // In this proposal, metadata will be accessed in the callee by the
            // `context.properties` property.
            return property(ctx.properties, ctx);
        }
        return property;
    }
}