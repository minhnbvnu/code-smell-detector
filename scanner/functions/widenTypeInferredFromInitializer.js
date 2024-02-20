function widenTypeInferredFromInitializer(declaration, type) {
                const widened = getCombinedNodeFlags(declaration) & 2 /* Const */ || isDeclarationReadonly(declaration) ? type : getWidenedLiteralType(type);
                if (isInJSFile(declaration)) {
                    if (isEmptyLiteralType(widened)) {
                        reportImplicitAny(declaration, anyType);
                        return anyType;
                    }
                    else if (isEmptyArrayLiteralType(widened)) {
                        reportImplicitAny(declaration, anyArrayType);
                        return anyArrayType;
                    }
                }
                return widened;
            }