function getImmediatelyContainingArgumentInfo(node, position, sourceFile) {
            const { parent: parent2 } = node;
            if (isCallOrNewExpression(parent2)) {
                const invocation = parent2;
                const info = getArgumentOrParameterListInfo(node, position, sourceFile);
                if (!info)
                    return void 0;
                const { list, argumentIndex, argumentCount, argumentsSpan } = info;
                const isTypeParameterList = !!parent2.typeArguments && parent2.typeArguments.pos === list.pos;
                return { isTypeParameterList, invocation: { kind: 0 /* Call */, node: invocation }, argumentsSpan, argumentIndex, argumentCount };
            }
            else if (isNoSubstitutionTemplateLiteral(node) && isTaggedTemplateExpression(parent2)) {
                if (isInsideTemplateLiteral(node, position, sourceFile)) {
                    return getArgumentListInfoForTemplate(parent2, 
                    /*argumentIndex*/
                    0, sourceFile);
                }
                return void 0;
            }
            else if (isTemplateHead(node) && parent2.parent.kind === 212 /* TaggedTemplateExpression */) {
                const templateExpression = parent2;
                const tagExpression = templateExpression.parent;
                Debug.assert(templateExpression.kind === 225 /* TemplateExpression */);
                const argumentIndex = isInsideTemplateLiteral(node, position, sourceFile) ? 0 : 1;
                return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
            }
            else if (isTemplateSpan(parent2) && isTaggedTemplateExpression(parent2.parent.parent)) {
                const templateSpan = parent2;
                const tagExpression = parent2.parent.parent;
                if (isTemplateTail(node) && !isInsideTemplateLiteral(node, position, sourceFile)) {
                    return void 0;
                }
                const spanIndex = templateSpan.parent.templateSpans.indexOf(templateSpan);
                const argumentIndex = getArgumentIndexForTemplatePiece(spanIndex, node, position, sourceFile);
                return getArgumentListInfoForTemplate(tagExpression, argumentIndex, sourceFile);
            }
            else if (isJsxOpeningLikeElement(parent2)) {
                const attributeSpanStart = parent2.attributes.pos;
                const attributeSpanEnd = skipTrivia(sourceFile.text, parent2.attributes.end, 
                /*stopAfterLineBreak*/
                false);
                return {
                    isTypeParameterList: false,
                    invocation: { kind: 0 /* Call */, node: parent2 },
                    argumentsSpan: createTextSpan(attributeSpanStart, attributeSpanEnd - attributeSpanStart),
                    argumentIndex: 0,
                    argumentCount: 1
                };
            }
            else {
                const typeArgInfo = getPossibleTypeArgumentsInfo(node, sourceFile);
                if (typeArgInfo) {
                    const { called, nTypeArguments } = typeArgInfo;
                    const invocation = { kind: 1 /* TypeArgs */, called };
                    const argumentsSpan = createTextSpanFromBounds(called.getStart(sourceFile), node.end);
                    return { isTypeParameterList: true, invocation, argumentsSpan, argumentIndex: nTypeArguments, argumentCount: nTypeArguments + 1 };
                }
                return void 0;
            }
        }