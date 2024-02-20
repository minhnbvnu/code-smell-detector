function getTypeForBindingElement(declaration) {
                const checkMode = declaration.dotDotDotToken ? 64 /* RestBindingElement */ : 0 /* Normal */;
                const parentType = getTypeForBindingElementParent(declaration.parent.parent, checkMode);
                return parentType && getBindingElementTypeFromParentType(declaration, parentType);
            }