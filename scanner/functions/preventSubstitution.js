function preventSubstitution(node) {
                if (noSubstitution === void 0)
                    noSubstitution = [];
                noSubstitution[getNodeId(node)] = true;
                return node;
            }