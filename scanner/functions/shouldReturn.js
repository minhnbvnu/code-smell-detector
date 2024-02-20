function shouldReturn(expression, transformer) {
            return !!expression.original && transformer.setOfExpressionsToReturn.has(getNodeId(expression.original));
        }