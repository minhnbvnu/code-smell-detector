function checkGroup(nodes) {
                const nodesToReport = nodes.filter(Boolean);
                if (nodes.length && (shouldMatchAnyDestructuredVariable || nodesToReport.length === nodes.length)) {
                    const varDeclParent = findUp(nodes[0], "VariableDeclaration", parentNode => parentNode.type.endsWith("Statement"));
                    const isVarDecParentNull = varDeclParent === null;
                    if (!isVarDecParentNull && varDeclParent.declarations.length > 0) {
                        const firstDeclaration = varDeclParent.declarations[0];
                        if (firstDeclaration.init) {
                            const firstDecParent = firstDeclaration.init.parent;
                            /*
                             * First we check the declaration type and then depending on
                             * if the type is a "VariableDeclarator" or its an "ObjectPattern"
                             * we compare the name and id from the first identifier, if the names are different
                             * we assign the new name, id and reset the count of reportCount and nodeCount in
                             * order to check each block for the number of reported errors and base our fix
                             * based on comparing nodes.length and nodesToReport.length.
                             */
                            if (firstDecParent.type === "VariableDeclarator") {
                                if (firstDecParent.id.name !== checkedName) {
                                    checkedName = firstDecParent.id.name;
                                    reportCount = 0;
                                }
                                if (firstDecParent.id.type === "ObjectPattern") {
                                    if (firstDecParent.init.name !== checkedName) {
                                        checkedName = firstDecParent.init.name;
                                        reportCount = 0;
                                    }
                                }
                                if (firstDecParent.id !== checkedId) {
                                    checkedId = firstDecParent.id;
                                    reportCount = 0;
                                }
                            }
                        }
                    }
                    let shouldFix = varDeclParent &&
                        // Don't do a fix unless all variables in the declarations are initialized (or it's in a for-in or for-of loop)
                        (varDeclParent.parent.type === "ForInStatement" || varDeclParent.parent.type === "ForOfStatement" ||
                            varDeclParent.declarations.every(declaration => declaration.init)) &&
                        /*
                         * If options.destructuring is "all", then this warning will not occur unless
                         * every assignment in the destructuring should be const. In that case, it's safe
                         * to apply the fix.
                         */
                        nodesToReport.length === nodes.length;
                    if (!isVarDecParentNull && varDeclParent.declarations && varDeclParent.declarations.length !== 1) {
                        if (varDeclParent && varDeclParent.declarations && varDeclParent.declarations.length >= 1) {
                            /*
                             * Add nodesToReport.length to a count, then comparing the count to the length
                             * of the declarations in the current block.
                             */
                            reportCount += nodesToReport.length;
                            let totalDeclarationsCount = 0;
                            varDeclParent.declarations.forEach(declaration => {
                                if (declaration.id.type === "ObjectPattern") {
                                    totalDeclarationsCount += declaration.id.properties.length;
                                }
                                else if (declaration.id.type === "ArrayPattern") {
                                    totalDeclarationsCount += declaration.id.elements.length;
                                }
                                else {
                                    totalDeclarationsCount += 1;
                                }
                            });
                            shouldFix = shouldFix && (reportCount === totalDeclarationsCount);
                        }
                    }
                    nodesToReport.forEach(node => {
                        context.report({
                            node,
                            messageId: "useConst",
                            data: node,
                            fix: shouldFix
                                ? fixer => {
                                    const letKeywordToken = sourceCode.getFirstToken(varDeclParent, t => t.value === varDeclParent.kind);
                                    /**
                                     * Extend the replacement range to the whole declaration,
                                     * in order to prevent other fixes in the same pass
                                     * https://github.com/eslint/eslint/issues/13899
                                     */
                                    return new FixTracker(fixer, sourceCode)
                                        .retainRange(varDeclParent.range)
                                        .replaceTextRange(letKeywordToken.range, "const");
                                }
                                : null
                        });
                    });
                }
            }