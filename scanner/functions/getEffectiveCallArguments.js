function getEffectiveCallArguments(node) {
                if (node.kind === 212 /* TaggedTemplateExpression */) {
                    const template = node.template;
                    const args2 = [createSyntheticExpression(template, getGlobalTemplateStringsArrayType())];
                    if (template.kind === 225 /* TemplateExpression */) {
                        forEach(template.templateSpans, (span) => {
                            args2.push(span.expression);
                        });
                    }
                    return args2;
                }
                if (node.kind === 167 /* Decorator */) {
                    return getEffectiveDecoratorArguments(node);
                }
                if (isJsxOpeningLikeElement(node)) {
                    return node.attributes.properties.length > 0 || isJsxOpeningElement(node) && node.parent.children.length > 0 ? [node.attributes] : emptyArray;
                }
                const args = node.arguments || emptyArray;
                const spreadIndex = getSpreadArgumentIndex(args);
                if (spreadIndex >= 0) {
                    const effectiveArgs = args.slice(0, spreadIndex);
                    for (let i = spreadIndex; i < args.length; i++) {
                        const arg = args[i];
                        const spreadType = arg.kind === 227 /* SpreadElement */ && (flowLoopCount ? checkExpression(arg.expression) : checkExpressionCached(arg.expression));
                        if (spreadType && isTupleType(spreadType)) {
                            forEach(getTypeArguments(spreadType), (t, i2) => {
                                var _a2;
                                const flags = spreadType.target.elementFlags[i2];
                                const syntheticArg = createSyntheticExpression(arg, flags & 4 /* Rest */ ? createArrayType(t) : t, !!(flags & 12 /* Variable */), (_a2 = spreadType.target.labeledElementDeclarations) == null ? void 0 : _a2[i2]);
                                effectiveArgs.push(syntheticArg);
                            });
                        }
                        else {
                            effectiveArgs.push(arg);
                        }
                    }
                    return effectiveArgs;
                }
                return args;
            }