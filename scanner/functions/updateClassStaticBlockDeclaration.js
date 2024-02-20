function updateClassStaticBlockDeclaration(node, body) {
                return node.body !== body ? finishUpdateClassStaticBlockDeclaration(createClassStaticBlockDeclaration(body), node) : node;
            }