function transformJSDocType(node) {
            switch (node.kind) {
                case 315 /* JSDocAllType */:
                case 316 /* JSDocUnknownType */:
                    return factory.createTypeReferenceNode("any", emptyArray);
                case 319 /* JSDocOptionalType */:
                    return transformJSDocOptionalType(node);
                case 318 /* JSDocNonNullableType */:
                    return transformJSDocType(node.type);
                case 317 /* JSDocNullableType */:
                    return transformJSDocNullableType(node);
                case 321 /* JSDocVariadicType */:
                    return transformJSDocVariadicType(node);
                case 320 /* JSDocFunctionType */:
                    return transformJSDocFunctionType(node);
                case 180 /* TypeReference */:
                    return transformJSDocTypeReference(node);
                case 325 /* JSDocTypeLiteral */:
                    return transformJSDocTypeLiteral(node);
                default:
                    const visited = visitEachChild(node, transformJSDocType, nullTransformationContext);
                    setEmitFlags(visited, 1 /* SingleLine */);
                    return visited;
            }
        }