function visitJsxOpeningLikeElementOrFragmentJSX(tagName, objectProperties, keyAttr, children, isChild, location) {
                var _a2;
                const nonWhitespaceChildren = getSemanticJsxChildren(children);
                const isStaticChildren = length(nonWhitespaceChildren) > 1 || !!((_a2 = nonWhitespaceChildren[0]) == null ? void 0 : _a2.dotDotDotToken);
                const args = [tagName, objectProperties];
                if (keyAttr) {
                    args.push(transformJsxAttributeInitializer(keyAttr.initializer));
                }
                if (compilerOptions.jsx === 5 /* ReactJSXDev */) {
                    const originalFile = getOriginalNode(currentSourceFile);
                    if (originalFile && isSourceFile(originalFile)) {
                        if (keyAttr === void 0) {
                            args.push(factory2.createVoidZero());
                        }
                        args.push(isStaticChildren ? factory2.createTrue() : factory2.createFalse());
                        const lineCol = getLineAndCharacterOfPosition(originalFile, location.pos);
                        args.push(factory2.createObjectLiteralExpression([
                            factory2.createPropertyAssignment("fileName", getCurrentFileNameExpression()),
                            factory2.createPropertyAssignment("lineNumber", factory2.createNumericLiteral(lineCol.line + 1)),
                            factory2.createPropertyAssignment("columnNumber", factory2.createNumericLiteral(lineCol.character + 1))
                        ]));
                        args.push(factory2.createThis());
                    }
                }
                const element = setTextRange(factory2.createCallExpression(getJsxFactoryCallee(isStaticChildren), 
                /*typeArguments*/
                void 0, args), location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }