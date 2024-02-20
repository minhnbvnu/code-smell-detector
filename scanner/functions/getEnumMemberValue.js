function getEnumMemberValue(node) {
                computeEnumMemberValues(node.parent);
                return getNodeLinks(node).enumMemberValue;
            }