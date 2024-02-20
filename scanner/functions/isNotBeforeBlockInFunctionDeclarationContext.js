function isNotBeforeBlockInFunctionDeclarationContext(context) {
            return !isFunctionDeclContext(context) && !isBeforeBlockContext(context);
        }