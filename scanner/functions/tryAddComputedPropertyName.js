function tryAddComputedPropertyName(expression, containers) {
            return pushLiteral(expression, containers) || isPropertyAccessExpression(expression) && (containers.push(expression.name.text), true) && tryAddComputedPropertyName(expression.expression, containers);
        }