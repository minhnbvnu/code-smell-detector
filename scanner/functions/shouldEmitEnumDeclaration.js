function shouldEmitEnumDeclaration(node) {
                return !isEnumConst(node) || shouldPreserveConstEnums(compilerOptions);
            }