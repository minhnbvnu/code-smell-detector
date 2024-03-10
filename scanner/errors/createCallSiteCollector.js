            function collect(node) {
                if (!node)
                    return;
                if (node.flags & 16777216 /* Ambient */) {
                    return;
                }
                if (isValidCallHierarchyDeclaration(node)) {
                    if (isClassLike(node)) {
                        for (const member of node.members) {
                            if (member.name && isComputedPropertyName(member.name)) {
                                collect(member.name.expression);
                            }
                        }
                    }
                    return;
                }
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 268 /* ImportEqualsDeclaration */:
                    case 269 /* ImportDeclaration */:
                    case 275 /* ExportDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                        return;
                    case 172 /* ClassStaticBlockDeclaration */:
                        recordCallSite(node);
                        return;
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        collect(node.expression);
                        return;
                    case 257 /* VariableDeclaration */:
                    case 166 /* Parameter */:
                        collect(node.name);
                        collect(node.initializer);
                        return;
                    case 210 /* CallExpression */:
                        recordCallSite(node);
                        collect(node.expression);
                        forEach(node.arguments, collect);
                        return;
                    case 211 /* NewExpression */:
                        recordCallSite(node);
                        collect(node.expression);
                        forEach(node.arguments, collect);
                        return;
                    case 212 /* TaggedTemplateExpression */:
                        recordCallSite(node);
                        collect(node.tag);
                        collect(node.template);
                        return;
                    case 283 /* JsxOpeningElement */:
                    case 282 /* JsxSelfClosingElement */:
                        recordCallSite(node);
                        collect(node.tagName);
                        collect(node.attributes);
                        return;
                    case 167 /* Decorator */:
                        recordCallSite(node);
                        collect(node.expression);
                        return;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        recordCallSite(node);
                        forEachChild(node, collect);
                        break;
                    case 235 /* SatisfiesExpression */:
                        collect(node.expression);
                        return;
                }
                if (isPartOfTypeNode(node)) {
                    return;
                }
                forEachChild(node, collect);
            }