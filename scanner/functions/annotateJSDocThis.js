function annotateJSDocThis(changes, sourceFile, containingFunction, typeNode) {
            changes.addJSDocTags(sourceFile, containingFunction, [
                factory.createJSDocThisTag(
                /*tagName*/
                void 0, factory.createJSDocTypeExpression(typeNode))
            ]);
        }