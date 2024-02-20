function getMethodReturnType(node) {
                return node.returnType == null
                    ? // if the method has no return type, it implicitly has an `any` return type
                        // we just make it explicit here so we can do the fix
                        'any'
                    : sourceCode.getText(node.returnType.typeAnnotation);
            }