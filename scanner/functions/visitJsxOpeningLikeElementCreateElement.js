function visitJsxOpeningLikeElementCreateElement(node, children, isChild, location) {
                const tagName = getTagName(node);
                const attrs = node.attributes.properties;
                const objectProperties = length(attrs) ? transformJsxAttributesToObjectProps(attrs) : factory2.createNull();
                const callee = currentFileState.importSpecifier === void 0 ? createJsxFactoryExpression(factory2, context.getEmitResolver().getJsxFactoryEntity(currentSourceFile), compilerOptions.reactNamespace, 
                // TODO: GH#18217
                node) : getImplicitImportForName("createElement");
                const element = createExpressionForJsxElement(factory2, callee, tagName, objectProperties, mapDefined(children, transformJsxChildToExpression), location);
                if (isChild) {
                    startOnNewLine(element);
                }
                return element;
            }