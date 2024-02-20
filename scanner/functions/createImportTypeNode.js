function createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf = false) {
                const node = createBaseNode(202 /* ImportType */);
                node.argument = argument;
                node.assertions = assertions;
                node.qualifier = qualifier;
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.isTypeOf = isTypeOf;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }