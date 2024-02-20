function getPresentModifiers(contextToken, sourceFile, position) {
            if (!contextToken || getLineAndCharacterOfPosition(sourceFile, position).line > getLineAndCharacterOfPosition(sourceFile, contextToken.getEnd()).line) {
                return { modifiers: 0 /* None */ };
            }
            let modifiers = 0 /* None */;
            let span;
            let contextMod;
            if (contextMod = isModifierLike2(contextToken)) {
                modifiers |= modifierToFlag(contextMod);
                span = createTextSpanFromNode(contextToken);
            }
            if (isPropertyDeclaration(contextToken.parent)) {
                modifiers |= modifiersToFlags(contextToken.parent.modifiers) & 126975 /* Modifier */;
                span = createTextSpanFromNode(contextToken.parent);
            }
            return { modifiers, span };
        }