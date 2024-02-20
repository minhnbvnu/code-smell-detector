function getSelectionChildren(node) {
            var _a2;
            if (isSourceFile(node)) {
                return groupChildren(node.getChildAt(0).getChildren(), isImport2);
            }
            if (isMappedTypeNode(node)) {
                const [openBraceToken, ...children] = node.getChildren();
                const closeBraceToken = Debug.checkDefined(children.pop());
                Debug.assertEqual(openBraceToken.kind, 18 /* OpenBraceToken */);
                Debug.assertEqual(closeBraceToken.kind, 19 /* CloseBraceToken */);
                const groupedWithPlusMinusTokens = groupChildren(children, (child) => child === node.readonlyToken || child.kind === 146 /* ReadonlyKeyword */ || child === node.questionToken || child.kind === 57 /* QuestionToken */);
                const groupedWithBrackets = groupChildren(groupedWithPlusMinusTokens, ({ kind }) => kind === 22 /* OpenBracketToken */ || kind === 165 /* TypeParameter */ || kind === 23 /* CloseBracketToken */);
                return [
                    openBraceToken,
                    // Pivot on `:`
                    createSyntaxList2(splitChildren(groupedWithBrackets, ({ kind }) => kind === 58 /* ColonToken */)),
                    closeBraceToken
                ];
            }
            if (isPropertySignature(node)) {
                const children = groupChildren(node.getChildren(), (child) => child === node.name || contains(node.modifiers, child));
                const firstJSDocChild = ((_a2 = children[0]) == null ? void 0 : _a2.kind) === 323 /* JSDoc */ ? children[0] : void 0;
                const withJSDocSeparated = firstJSDocChild ? children.slice(1) : children;
                const splittedChildren = splitChildren(withJSDocSeparated, ({ kind }) => kind === 58 /* ColonToken */);
                return firstJSDocChild ? [firstJSDocChild, createSyntaxList2(splittedChildren)] : splittedChildren;
            }
            if (isParameter(node)) {
                const groupedDotDotDotAndName = groupChildren(node.getChildren(), (child) => child === node.dotDotDotToken || child === node.name);
                const groupedWithQuestionToken = groupChildren(groupedDotDotDotAndName, (child) => child === groupedDotDotDotAndName[0] || child === node.questionToken);
                return splitChildren(groupedWithQuestionToken, ({ kind }) => kind === 63 /* EqualsToken */);
            }
            if (isBindingElement(node)) {
                return splitChildren(node.getChildren(), ({ kind }) => kind === 63 /* EqualsToken */);
            }
            return node.getChildren();
        }