function checkClassBody(node) {
                const methodDefinitions = node.body.filter(m => m.type === "MethodDefinition");
                checkList(methodDefinitions.filter(m => m.static));
                checkList(methodDefinitions.filter(m => !m.static));
            }