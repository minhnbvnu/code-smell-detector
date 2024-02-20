function getTypeFromNamedTupleTypeNode(node) {
                const links = getNodeLinks(node);
                return links.resolvedType || (links.resolvedType = node.dotDotDotToken ? getTypeFromRestTypeNode(node) : addOptionality(getTypeFromTypeNode(node.type), 
                /*isProperty*/
                true, !!node.questionToken));
            }