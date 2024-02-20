function getArrayOrTupleTargetType(node) {
                const readonly = isReadonlyTypeOperator(node.parent);
                const elementType = getArrayElementTypeNode(node);
                if (elementType) {
                    return readonly ? globalReadonlyArrayType : globalArrayType;
                }
                const elementFlags = map(node.elements, getTupleElementFlags);
                const missingName = some(node.elements, (e) => e.kind !== 199 /* NamedTupleMember */);
                return getTupleTargetType(elementFlags, readonly, 
                /*associatedNames*/
                missingName ? void 0 : node.elements);
            }