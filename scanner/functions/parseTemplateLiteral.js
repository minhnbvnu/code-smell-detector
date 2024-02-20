function parseTemplateLiteral() {
        var quasi, quasis, expressions, marker = markerCreate();

        quasi = parseTemplateElement({ head: true });
        quasis = [ quasi ];
        expressions = [];

        while (!quasi.tail) {
            expressions.push(parseExpression());
            quasi = parseTemplateElement({ head: false });
            quasis.push(quasi);
        }

        return markerApply(marker, delegate.createTemplateLiteral(quasis, expressions));
    }