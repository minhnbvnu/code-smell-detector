function reclassifyByType(typeChecker, node, typeIdx) {
            if (typeIdx === 7 /* variable */ || typeIdx === 9 /* property */ || typeIdx === 6 /* parameter */) {
                const type = typeChecker.getTypeAtLocation(node);
                if (type) {
                    const test = (condition) => {
                        return condition(type) || type.isUnion() && type.types.some(condition);
                    };
                    if (typeIdx !== 6 /* parameter */ && test((t) => t.getConstructSignatures().length > 0)) {
                        return 0 /* class */;
                    }
                    if (test((t) => t.getCallSignatures().length > 0) && !test((t) => t.getProperties().length > 0) || isExpressionInCallExpression(node)) {
                        return typeIdx === 9 /* property */ ? 11 /* member */ : 10 /* function */;
                    }
                }
            }
            return typeIdx;
        }