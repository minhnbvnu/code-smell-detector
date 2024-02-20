function convertJsxChildrenToChildrenPropObject(children) {
                const prop = convertJsxChildrenToChildrenPropAssignment(children);
                return prop && factory2.createObjectLiteralExpression([prop]);
            }