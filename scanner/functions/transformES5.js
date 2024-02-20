function transformES5(context) {
            const { factory: factory2 } = context;
            const compilerOptions = context.getCompilerOptions();
            let previousOnEmitNode;
            let noSubstitution;
            if (compilerOptions.jsx === 1 /* Preserve */ || compilerOptions.jsx === 3 /* ReactNative */) {
                previousOnEmitNode = context.onEmitNode;
                context.onEmitNode = onEmitNode;
                context.enableEmitNotification(283 /* JsxOpeningElement */);
                context.enableEmitNotification(284 /* JsxClosingElement */);
                context.enableEmitNotification(282 /* JsxSelfClosingElement */);
                noSubstitution = [];
            }
            const previousOnSubstituteNode = context.onSubstituteNode;
            context.onSubstituteNode = onSubstituteNode;
            context.enableSubstitution(208 /* PropertyAccessExpression */);
            context.enableSubstitution(299 /* PropertyAssignment */);
            return chainBundle(context, transformSourceFile);
            function transformSourceFile(node) {
                return node;
            }
            function onEmitNode(hint, node, emitCallback) {
                switch (node.kind) {
                    case 283 /* JsxOpeningElement */:
                    case 284 /* JsxClosingElement */:
                    case 282 /* JsxSelfClosingElement */:
                        const tagName = node.tagName;
                        noSubstitution[getOriginalNodeId(tagName)] = true;
                        break;
                }
                previousOnEmitNode(hint, node, emitCallback);
            }
            function onSubstituteNode(hint, node) {
                if (node.id && noSubstitution && noSubstitution[node.id]) {
                    return previousOnSubstituteNode(hint, node);
                }
                node = previousOnSubstituteNode(hint, node);
                if (isPropertyAccessExpression(node)) {
                    return substitutePropertyAccessExpression(node);
                }
                else if (isPropertyAssignment(node)) {
                    return substitutePropertyAssignment(node);
                }
                return node;
            }
            function substitutePropertyAccessExpression(node) {
                if (isPrivateIdentifier(node.name)) {
                    return node;
                }
                const literalName = trySubstituteReservedName(node.name);
                if (literalName) {
                    return setTextRange(factory2.createElementAccessExpression(node.expression, literalName), node);
                }
                return node;
            }
            function substitutePropertyAssignment(node) {
                const literalName = isIdentifier(node.name) && trySubstituteReservedName(node.name);
                if (literalName) {
                    return factory2.updatePropertyAssignment(node, literalName, node.initializer);
                }
                return node;
            }
            function trySubstituteReservedName(name) {
                const token = identifierToKeywordKind(name);
                if (token !== void 0 && token >= 81 /* FirstReservedWord */ && token <= 116 /* LastReservedWord */) {
                    return setTextRange(factory2.createStringLiteralFromNode(name), name);
                }
                return void 0;
            }
        }