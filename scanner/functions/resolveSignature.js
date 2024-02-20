function resolveSignature(node, candidatesOutArray, checkMode) {
                switch (node.kind) {
                    case 210 /* CallExpression */:
                        return resolveCallExpression(node, candidatesOutArray, checkMode);
                    case 211 /* NewExpression */:
                        return resolveNewExpression(node, candidatesOutArray, checkMode);
                    case 212 /* TaggedTemplateExpression */:
                        return resolveTaggedTemplateExpression(node, candidatesOutArray, checkMode);
                    case 167 /* Decorator */:
                        return resolveDecorator(node, candidatesOutArray, checkMode);
                    case 283 /* JsxOpeningElement */:
                    case 282 /* JsxSelfClosingElement */:
                        return resolveJsxOpeningLikeElement(node, candidatesOutArray, checkMode);
                }
                throw Debug.assertNever(node, "Branch in 'resolveSignature' should be unreachable.");
            }