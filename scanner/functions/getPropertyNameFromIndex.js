function getPropertyNameFromIndex(indexType, accessNode) {
                return isTypeUsableAsPropertyName(indexType) ? getPropertyNameFromType(indexType) : accessNode && isPropertyName(accessNode) ? (
                // late bound names are handled in the first branch, so here we only need to handle normal names
                getPropertyNameForPropertyNameNode(accessNode)) : void 0;
            }