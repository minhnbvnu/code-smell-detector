function getOutliningSpanForNode(n, sourceFile) {
            switch (n.kind) {
                case 238 /* Block */:
                    if (isFunctionLike(n.parent)) {
                        return functionSpan(n.parent, n, sourceFile);
                    }
                    switch (n.parent.kind) {
                        case 243 /* DoStatement */:
                        case 246 /* ForInStatement */:
                        case 247 /* ForOfStatement */:
                        case 245 /* ForStatement */:
                        case 242 /* IfStatement */:
                        case 244 /* WhileStatement */:
                        case 251 /* WithStatement */:
                        case 295 /* CatchClause */:
                            return spanForNode(n.parent);
                        case 255 /* TryStatement */:
                            const tryStatement = n.parent;
                            if (tryStatement.tryBlock === n) {
                                return spanForNode(n.parent);
                            }
                            else if (tryStatement.finallyBlock === n) {
                                const node = findChildOfKind(tryStatement, 96 /* FinallyKeyword */, sourceFile);
                                if (node)
                                    return spanForNode(node);
                            }
                        default:
                            return createOutliningSpan(createTextSpanFromNode(n, sourceFile), "code" /* Code */);
                    }
                case 265 /* ModuleBlock */:
                    return spanForNode(n.parent);
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                case 266 /* CaseBlock */:
                case 184 /* TypeLiteral */:
                case 203 /* ObjectBindingPattern */:
                    return spanForNode(n);
                case 186 /* TupleType */:
                    return spanForNode(n, 
                    /*autoCollapse*/
                    false, 
                    /*useFullStart*/
                    !isTupleTypeNode(n.parent), 22 /* OpenBracketToken */);
                case 292 /* CaseClause */:
                case 293 /* DefaultClause */:
                    return spanForNodeArray(n.statements);
                case 207 /* ObjectLiteralExpression */:
                    return spanForObjectOrArrayLiteral(n);
                case 206 /* ArrayLiteralExpression */:
                    return spanForObjectOrArrayLiteral(n, 22 /* OpenBracketToken */);
                case 281 /* JsxElement */:
                    return spanForJSXElement(n);
                case 285 /* JsxFragment */:
                    return spanForJSXFragment(n);
                case 282 /* JsxSelfClosingElement */:
                case 283 /* JsxOpeningElement */:
                    return spanForJSXAttributes(n.attributes);
                case 225 /* TemplateExpression */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                    return spanForTemplateLiteral(n);
                case 204 /* ArrayBindingPattern */:
                    return spanForNode(n, 
                    /*autoCollapse*/
                    false, 
                    /*useFullStart*/
                    !isBindingElement(n.parent), 22 /* OpenBracketToken */);
                case 216 /* ArrowFunction */:
                    return spanForArrowFunction(n);
                case 210 /* CallExpression */:
                    return spanForCallExpression(n);
                case 214 /* ParenthesizedExpression */:
                    return spanForParenthesizedExpression(n);
                case 272 /* NamedImports */:
                case 276 /* NamedExports */:
                case 296 /* AssertClause */:
                    return spanForNamedImportsOrExportsOrAssertClause(n);
            }
            function spanForNamedImportsOrExportsOrAssertClause(node) {
                if (!node.elements.length) {
                    return void 0;
                }
                const openToken = findChildOfKind(node, 18 /* OpenBraceToken */, sourceFile);
                const closeToken = findChildOfKind(node, 19 /* CloseBraceToken */, sourceFile);
                if (!openToken || !closeToken || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) {
                    return void 0;
                }
                return spanBetweenTokens(openToken, closeToken, node, sourceFile, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                false);
            }
            function spanForCallExpression(node) {
                if (!node.arguments.length) {
                    return void 0;
                }
                const openToken = findChildOfKind(node, 20 /* OpenParenToken */, sourceFile);
                const closeToken = findChildOfKind(node, 21 /* CloseParenToken */, sourceFile);
                if (!openToken || !closeToken || positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) {
                    return void 0;
                }
                return spanBetweenTokens(openToken, closeToken, node, sourceFile, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                true);
            }
            function spanForArrowFunction(node) {
                if (isBlock(node.body) || isParenthesizedExpression(node.body) || positionsAreOnSameLine(node.body.getFullStart(), node.body.getEnd(), sourceFile)) {
                    return void 0;
                }
                const textSpan = createTextSpanFromBounds(node.body.getFullStart(), node.body.getEnd());
                return createOutliningSpan(textSpan, "code" /* Code */, createTextSpanFromNode(node));
            }
            function spanForJSXElement(node) {
                const textSpan = createTextSpanFromBounds(node.openingElement.getStart(sourceFile), node.closingElement.getEnd());
                const tagName = node.openingElement.tagName.getText(sourceFile);
                const bannerText = "<" + tagName + ">...</" + tagName + ">";
                return createOutliningSpan(textSpan, "code" /* Code */, textSpan, 
                /*autoCollapse*/
                false, bannerText);
            }
            function spanForJSXFragment(node) {
                const textSpan = createTextSpanFromBounds(node.openingFragment.getStart(sourceFile), node.closingFragment.getEnd());
                const bannerText = "<>...</>";
                return createOutliningSpan(textSpan, "code" /* Code */, textSpan, 
                /*autoCollapse*/
                false, bannerText);
            }
            function spanForJSXAttributes(node) {
                if (node.properties.length === 0) {
                    return void 0;
                }
                return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), "code" /* Code */);
            }
            function spanForTemplateLiteral(node) {
                if (node.kind === 14 /* NoSubstitutionTemplateLiteral */ && node.text.length === 0) {
                    return void 0;
                }
                return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), "code" /* Code */);
            }
            function spanForObjectOrArrayLiteral(node, open = 18 /* OpenBraceToken */) {
                return spanForNode(node, 
                /*autoCollapse*/
                false, 
                /*useFullStart*/
                !isArrayLiteralExpression(node.parent) && !isCallExpression(node.parent), open);
            }
            function spanForNode(hintSpanNode, autoCollapse = false, useFullStart = true, open = 18 /* OpenBraceToken */, close = open === 18 /* OpenBraceToken */ ? 19 /* CloseBraceToken */ : 23 /* CloseBracketToken */) {
                const openToken = findChildOfKind(n, open, sourceFile);
                const closeToken = findChildOfKind(n, close, sourceFile);
                return openToken && closeToken && spanBetweenTokens(openToken, closeToken, hintSpanNode, sourceFile, autoCollapse, useFullStart);
            }
            function spanForNodeArray(nodeArray) {
                return nodeArray.length ? createOutliningSpan(createTextSpanFromRange(nodeArray), "code" /* Code */) : void 0;
            }
            function spanForParenthesizedExpression(node) {
                if (positionsAreOnSameLine(node.getStart(), node.getEnd(), sourceFile))
                    return void 0;
                const textSpan = createTextSpanFromBounds(node.getStart(), node.getEnd());
                return createOutliningSpan(textSpan, "code" /* Code */, createTextSpanFromNode(node));
            }
        }