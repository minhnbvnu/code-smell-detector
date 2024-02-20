function checkThisBeforeSuper(node, container, diagnosticMessage) {
                const containingClassDecl = container.parent;
                const baseTypeNode = getClassExtendsHeritageElement(containingClassDecl);
                if (baseTypeNode && !classDeclarationExtendsNull(containingClassDecl)) {
                    if (canHaveFlowNode(node) && node.flowNode && !isPostSuperFlowNode(node.flowNode, 
                    /*noCacheCheck*/
                    false)) {
                        error(node, diagnosticMessage);
                    }
                }
            }