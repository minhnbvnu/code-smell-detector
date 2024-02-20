function getAssignedTypeOfPropertyAssignment(node) {
                return getTypeOfDestructuredProperty(getAssignedType(node.parent), node.name);
            }