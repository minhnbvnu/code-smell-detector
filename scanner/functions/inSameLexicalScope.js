function inSameLexicalScope(node1, node2) {
                const container1 = getEnclosingBlockScopeContainer(node1);
                const container2 = getEnclosingBlockScopeContainer(node2);
                if (isGlobalSourceFile(container1)) {
                    return isGlobalSourceFile(container2);
                }
                else if (isGlobalSourceFile(container2)) {
                    return false;
                }
                else {
                    return container1 === container2;
                }
            }