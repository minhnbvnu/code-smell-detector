function setCurrentStaticPropertyDeclarationOrStaticBlockAnd(current, visitor2, arg) {
                const savedCurrentStaticPropertyDeclarationOrStaticBlock = currentStaticPropertyDeclarationOrStaticBlock;
                currentStaticPropertyDeclarationOrStaticBlock = current;
                const result = visitor2(arg);
                currentStaticPropertyDeclarationOrStaticBlock = savedCurrentStaticPropertyDeclarationOrStaticBlock;
                return result;
            }