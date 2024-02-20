function readVectorProperty(property, options) {
    if (property != undefined) {
        if (mapbox.expression.isExpression(property)) {
            return mapbox.expression.createExpression(property, options).value;
        } else {
            return property;
        }
    }
}