function areLineBreaksRequired(node, options, first, last) {
        let objectProperties;
        if (node.type === "ObjectExpression" || node.type === "ObjectPattern") {
            objectProperties = node.properties;
        }
        else {
            // is ImportDeclaration or ExportNamedDeclaration
            objectProperties = node.specifiers
                .filter(s => s.type === "ImportSpecifier" || s.type === "ExportSpecifier");
        }
        return objectProperties.length >= options.minProperties ||
            (options.multiline &&
                objectProperties.length > 0 &&
                first.loc.start.line !== last.loc.end.line);
    }