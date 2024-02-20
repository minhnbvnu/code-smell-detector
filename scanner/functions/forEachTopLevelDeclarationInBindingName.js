function forEachTopLevelDeclarationInBindingName(name, cb) {
            switch (name.kind) {
                case 79 /* Identifier */:
                    return cb(cast(name.parent, (x) => isVariableDeclaration(x) || isBindingElement(x)));
                case 204 /* ArrayBindingPattern */:
                case 203 /* ObjectBindingPattern */:
                    return firstDefined(name.elements, (em) => isOmittedExpression(em) ? void 0 : forEachTopLevelDeclarationInBindingName(em.name, cb));
                default:
                    return Debug.assertNever(name, `Unexpected name kind ${name.kind}`);
            }
        }