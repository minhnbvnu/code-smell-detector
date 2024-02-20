function isGenericOfAStaticMethodShadow(variable, shadowed) {
                return (isGenericOfStaticMethod(variable) && isGenericOfClassDecl(shadowed));
            }