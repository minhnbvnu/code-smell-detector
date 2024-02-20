function mergeLexicalEnvironment(statements, declarations) {
                if (!some(declarations)) {
                    return statements;
                }
                const leftStandardPrologueEnd = findSpanEnd(statements, isPrologueDirective, 0);
                const leftHoistedFunctionsEnd = findSpanEnd(statements, isHoistedFunction, leftStandardPrologueEnd);
                const leftHoistedVariablesEnd = findSpanEnd(statements, isHoistedVariableStatement, leftHoistedFunctionsEnd);
                const rightStandardPrologueEnd = findSpanEnd(declarations, isPrologueDirective, 0);
                const rightHoistedFunctionsEnd = findSpanEnd(declarations, isHoistedFunction, rightStandardPrologueEnd);
                const rightHoistedVariablesEnd = findSpanEnd(declarations, isHoistedVariableStatement, rightHoistedFunctionsEnd);
                const rightCustomPrologueEnd = findSpanEnd(declarations, isCustomPrologue, rightHoistedVariablesEnd);
                Debug.assert(rightCustomPrologueEnd === declarations.length, "Expected declarations to be valid standard or custom prologues");
                const left = isNodeArray(statements) ? statements.slice() : statements;
                if (rightCustomPrologueEnd > rightHoistedVariablesEnd) {
                    left.splice(leftHoistedVariablesEnd, 0, ...declarations.slice(rightHoistedVariablesEnd, rightCustomPrologueEnd));
                }
                if (rightHoistedVariablesEnd > rightHoistedFunctionsEnd) {
                    left.splice(leftHoistedFunctionsEnd, 0, ...declarations.slice(rightHoistedFunctionsEnd, rightHoistedVariablesEnd));
                }
                if (rightHoistedFunctionsEnd > rightStandardPrologueEnd) {
                    left.splice(leftStandardPrologueEnd, 0, ...declarations.slice(rightStandardPrologueEnd, rightHoistedFunctionsEnd));
                }
                if (rightStandardPrologueEnd > 0) {
                    if (leftStandardPrologueEnd === 0) {
                        left.splice(0, 0, ...declarations.slice(0, rightStandardPrologueEnd));
                    }
                    else {
                        const leftPrologues = /* @__PURE__ */ new Map();
                        for (let i = 0; i < leftStandardPrologueEnd; i++) {
                            const leftPrologue = statements[i];
                            leftPrologues.set(leftPrologue.expression.text, true);
                        }
                        for (let i = rightStandardPrologueEnd - 1; i >= 0; i--) {
                            const rightPrologue = declarations[i];
                            if (!leftPrologues.has(rightPrologue.expression.text)) {
                                left.unshift(rightPrologue);
                            }
                        }
                    }
                }
                if (isNodeArray(statements)) {
                    return setTextRange(createNodeArray(left, statements.hasTrailingComma), statements);
                }
                return statements;
            }