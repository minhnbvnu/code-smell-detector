function createTupleTypeNode(elements) {
                const node = createBaseNode(186 /* TupleType */);
                node.elements = createNodeArray(parenthesizerRules().parenthesizeElementTypesOfTupleType(elements));
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }