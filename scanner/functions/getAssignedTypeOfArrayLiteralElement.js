function getAssignedTypeOfArrayLiteralElement(node, element) {
                return getTypeOfDestructuredArrayElement(getAssignedType(node), node.elements.indexOf(element));
            }