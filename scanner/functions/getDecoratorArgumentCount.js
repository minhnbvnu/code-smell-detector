function getDecoratorArgumentCount(node, signature) {
                return compilerOptions.experimentalDecorators ? getLegacyDecoratorArgumentCount(node, signature) : 2;
            }