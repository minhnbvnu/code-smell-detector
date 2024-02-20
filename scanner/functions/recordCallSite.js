function recordCallSite(node) {
                const target = isTaggedTemplateExpression(node) ? node.tag : isJsxOpeningLikeElement(node) ? node.tagName : isAccessExpression(node) ? node : isClassStaticBlockDeclaration(node) ? node : node.expression;
                const declaration = resolveCallHierarchyDeclaration(program, target);
                if (declaration) {
                    const range = createTextRangeFromNode(target, node.getSourceFile());
                    if (isArray(declaration)) {
                        for (const decl of declaration) {
                            callSites.push({ declaration: decl, range });
                        }
                    }
                    else {
                        callSites.push({ declaration, range });
                    }
                }
            }