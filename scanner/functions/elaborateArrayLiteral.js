function elaborateArrayLiteral(node, source, target, relation, containingMessageChain, errorOutputContainer) {
                if (target.flags & (134348796 /* Primitive */ | 131072 /* Never */))
                    return false;
                if (isTupleLikeType(source)) {
                    return elaborateElementwise(generateLimitedTupleElements(node, target), source, target, relation, containingMessageChain, errorOutputContainer);
                }
                pushContextualType(node, target, 
                /*isCache*/
                false);
                const tupleizedType = checkArrayLiteral(node, 1 /* Contextual */, 
                /*forceTuple*/
                true);
                popContextualType();
                if (isTupleLikeType(tupleizedType)) {
                    return elaborateElementwise(generateLimitedTupleElements(node, target), tupleizedType, target, relation, containingMessageChain, errorOutputContainer);
                }
                return false;
            }