function getImpliedConstraint(type, checkNode, extendsNode) {
                return isUnaryTupleTypeNode(checkNode) && isUnaryTupleTypeNode(extendsNode) ? getImpliedConstraint(type, checkNode.elements[0], extendsNode.elements[0]) : getActualTypeVariable(getTypeFromTypeNode(checkNode)) === getActualTypeVariable(type) ? getTypeFromTypeNode(extendsNode) : void 0;
            }