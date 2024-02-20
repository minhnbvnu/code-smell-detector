function forEachDestructuringIdentifier(pattern, fn) {
        for (const element of pattern.elements) {
            if (element.kind !== ts.SyntaxKind.BindingElement)
                continue;
            let result;
            if (element.name.kind === ts.SyntaxKind.Identifier) {
                result = fn(element);
            }
            else {
                result = forEachDestructuringIdentifier(element.name, fn);
            }
            if (result)
                return result;
        }
    }