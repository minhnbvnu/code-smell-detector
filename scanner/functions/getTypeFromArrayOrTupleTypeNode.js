function getTypeFromArrayOrTupleTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    const target = getArrayOrTupleTargetType(node);
                    if (target === emptyGenericType) {
                        links.resolvedType = emptyObjectType;
                    }
                    else if (!(node.kind === 186 /* TupleType */ && some(node.elements, (e) => !!(getTupleElementFlags(e) & 8 /* Variadic */))) && isDeferredTypeReferenceNode(node)) {
                        links.resolvedType = node.kind === 186 /* TupleType */ && node.elements.length === 0 ? target : createDeferredTypeReference(target, node, 
                        /*mapper*/
                        void 0);
                    }
                    else {
                        const elementTypes = node.kind === 185 /* ArrayType */ ? [getTypeFromTypeNode(node.elementType)] : map(node.elements, getTypeFromTypeNode);
                        links.resolvedType = createNormalizedTypeReference(target, elementTypes);
                    }
                }
                return links.resolvedType;
            }