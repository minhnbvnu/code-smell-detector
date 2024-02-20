function getTypeNode3(node) {
                const type = checker.getTypeAtLocation(node);
                return getTypeNodeIfAccessible(type, node, program, host);
            }