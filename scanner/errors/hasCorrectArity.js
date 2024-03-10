function hasCorrectArity(node, args, signature, signatureHelpTrailingComma = false) {
                let argCount;
                let callIsIncomplete = false;
                let effectiveParameterCount = getParameterCount(signature);
                let effectiveMinimumArguments = getMinArgumentCount(signature);
                if (node.kind === 212 /* TaggedTemplateExpression */) {
                    argCount = args.length;
                    if (node.template.kind === 225 /* TemplateExpression */) {
                        const lastSpan = last(node.template.templateSpans);
                        callIsIncomplete = nodeIsMissing(lastSpan.literal) || !!lastSpan.literal.isUnterminated;
                    }
                    else {
                        const templateLiteral = node.template;
                        Debug.assert(templateLiteral.kind === 14 /* NoSubstitutionTemplateLiteral */);
                        callIsIncomplete = !!templateLiteral.isUnterminated;
                    }
                }
                else if (node.kind === 167 /* Decorator */) {
                    argCount = getDecoratorArgumentCount(node, signature);
                }
                else if (isJsxOpeningLikeElement(node)) {
                    callIsIncomplete = node.attributes.end === node.end;
                    if (callIsIncomplete) {
                        return true;
                    }
                    argCount = effectiveMinimumArguments === 0 ? args.length : 1;
                    effectiveParameterCount = args.length === 0 ? effectiveParameterCount : 1;
                    effectiveMinimumArguments = Math.min(effectiveMinimumArguments, 1);
                }
                else if (!node.arguments) {
                    Debug.assert(node.kind === 211 /* NewExpression */);
                    return getMinArgumentCount(signature) === 0;
                }
                else {
                    argCount = signatureHelpTrailingComma ? args.length + 1 : args.length;
                    callIsIncomplete = node.arguments.end === node.end;
                    const spreadArgIndex = getSpreadArgumentIndex(args);
                    if (spreadArgIndex >= 0) {
                        return spreadArgIndex >= getMinArgumentCount(signature) && (hasEffectiveRestParameter(signature) || spreadArgIndex < getParameterCount(signature));
                    }
                }
                if (!hasEffectiveRestParameter(signature) && argCount > effectiveParameterCount) {
                    return false;
                }
                if (callIsIncomplete || argCount >= effectiveMinimumArguments) {
                    return true;
                }
                for (let i = argCount; i < effectiveMinimumArguments; i++) {
                    const type = getTypeAtPosition(signature, i);
                    if (filterType(type, isInJSFile(node) && !strictNullChecks ? acceptsVoidUndefinedUnknownOrAny : acceptsVoid).flags & 131072 /* Never */) {
                        return false;
                    }
                }
                return true;
            }