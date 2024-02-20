function createJSDocEnumTag(tagName, typeExpression, comment) {
                const node = createBaseJSDocTagDeclaration(343 /* JSDocEnumTag */, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(343 /* JSDocEnumTag */)), comment);
                node.typeExpression = typeExpression;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }