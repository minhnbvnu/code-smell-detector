function checkSwitchExhaustive(node) {
                var _a;
                const discriminantType = getNodeType(node.discriminant);
                const symbolName = (_a = discriminantType.getSymbol()) === null || _a === void 0 ? void 0 : _a.escapedName;
                if (discriminantType.isUnion()) {
                    const unionTypes = (0, tsutils_1.unionTypeParts)(discriminantType);
                    const caseTypes = new Set();
                    for (const switchCase of node.cases) {
                        if (switchCase.test == null) {
                            // Switch has 'default' branch - do nothing.
                            return;
                        }
                        caseTypes.add(getNodeType(switchCase.test));
                    }
                    const missingBranchTypes = unionTypes.filter(unionType => !caseTypes.has(unionType));
                    if (missingBranchTypes.length === 0) {
                        // All cases matched - do nothing.
                        return;
                    }
                    context.report({
                        node: node.discriminant,
                        messageId: 'switchIsNotExhaustive',
                        data: {
                            missingBranches: missingBranchTypes
                                .map(missingType => {
                                var _a;
                                return (0, tsutils_1.isTypeFlagSet)(missingType, ts.TypeFlags.ESSymbolLike)
                                    ? `typeof ${(_a = missingType.getSymbol()) === null || _a === void 0 ? void 0 : _a.escapedName}`
                                    : checker.typeToString(missingType);
                            })
                                .join(' | '),
                        },
                        suggest: [
                            {
                                messageId: 'addMissingCases',
                                fix(fixer) {
                                    return fixSwitch(fixer, node, missingBranchTypes, symbolName === null || symbolName === void 0 ? void 0 : symbolName.toString());
                                },
                            },
                        ],
                    });
                }
            }