function fixSwitch(fixer, node, missingBranchTypes, symbolName) {
                var _a;
                const lastCase = node.cases.length > 0 ? node.cases[node.cases.length - 1] : null;
                const caseIndent = lastCase
                    ? ' '.repeat(lastCase.loc.start.column)
                    : // if there are no cases, use indentation of the switch statement
                        // and leave it to user to format it correctly
                        ' '.repeat(node.loc.start.column);
                const missingCases = [];
                for (const missingBranchType of missingBranchTypes) {
                    // While running this rule on checker.ts of TypeScript project
                    // the fix introduced a compiler error due to:
                    //
                    // type __String = (string & {
                    //         __escapedIdentifier: void;
                    //     }) | (void & {
                    //         __escapedIdentifier: void;
                    //     }) | InternalSymbolName;
                    //
                    // The following check fixes it.
                    if (missingBranchType.isIntersection()) {
                        continue;
                    }
                    const missingBranchName = (_a = missingBranchType.getSymbol()) === null || _a === void 0 ? void 0 : _a.escapedName;
                    let caseTest = checker.typeToString(missingBranchType);
                    if (symbolName &&
                        (missingBranchName || missingBranchName === '') &&
                        (0, util_1.requiresQuoting)(missingBranchName.toString(), compilerOptions.target)) {
                        caseTest = `${symbolName}['${missingBranchName}']`;
                    }
                    const errorMessage = `Not implemented yet: ${caseTest} case`;
                    missingCases.push(`case ${caseTest}: { throw new Error('${errorMessage}') }`);
                }
                const fixString = missingCases
                    .map(code => `${caseIndent}${code}`)
                    .join('\n');
                if (lastCase) {
                    return fixer.insertTextAfter(lastCase, `\n${fixString}`);
                }
                // there were no existing cases
                const openingBrace = sourceCode.getTokenAfter(node.discriminant, util_1.isOpeningBraceToken);
                const closingBrace = sourceCode.getTokenAfter(node.discriminant, util_1.isClosingBraceToken);
                return fixer.replaceTextRange([openingBrace.range[0], closingBrace.range[1]], ['{', fixString, `${caseIndent}}`].join('\n'));
            }