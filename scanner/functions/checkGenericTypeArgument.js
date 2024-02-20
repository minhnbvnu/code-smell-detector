function checkGenericTypeArgument(node) {
                var _a, _b;
                // only matches T<..., void, ...>
                // extra check for precaution
                /* istanbul ignore next */
                if (((_a = node.parent) === null || _a === void 0 ? void 0 : _a.type) !== utils_1.AST_NODE_TYPES.TSTypeParameterInstantiation ||
                    ((_b = node.parent.parent) === null || _b === void 0 ? void 0 : _b.type) !== utils_1.AST_NODE_TYPES.TSTypeReference) {
                    return;
                }
                // check whitelist
                if (Array.isArray(allowInGenericTypeArguments)) {
                    const sourceCode = context.getSourceCode();
                    const fullyQualifiedName = sourceCode
                        .getText(node.parent.parent.typeName)
                        .replace(/ /gu, '');
                    if (!allowInGenericTypeArguments
                        .map(s => s.replace(/ /gu, ''))
                        .includes(fullyQualifiedName)) {
                        context.report({
                            messageId: 'invalidVoidForGeneric',
                            data: { generic: fullyQualifiedName },
                            node,
                        });
                    }
                    return;
                }
                if (!allowInGenericTypeArguments) {
                    context.report({
                        messageId: allowAsThisParameter
                            ? 'invalidVoidNotReturnOrThisParam'
                            : 'invalidVoidNotReturn',
                        node,
                    });
                }
            }