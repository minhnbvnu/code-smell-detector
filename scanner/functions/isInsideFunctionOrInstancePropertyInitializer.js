function isInsideFunctionOrInstancePropertyInitializer(node, threshold) {
                return !!findAncestor(node, (n) => n === threshold ? "quit" : isFunctionLike(n) || n.parent && isPropertyDeclaration(n.parent) && !hasStaticModifier(n.parent) && n.parent.initializer === n);
            }