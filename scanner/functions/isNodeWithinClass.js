function isNodeWithinClass(node, classDeclaration) {
                return !!forEachEnclosingClass(node, (n) => n === classDeclaration);
            }