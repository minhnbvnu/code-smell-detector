function convertAssignment(sourceFile, checker, assignment, changes, exports, useSitesToUnqualify) {
            const { left, right } = assignment;
            if (!isPropertyAccessExpression(left)) {
                return false;
            }
            if (isExportsOrModuleExportsOrAlias(sourceFile, left)) {
                if (isExportsOrModuleExportsOrAlias(sourceFile, right)) {
                    changes.delete(sourceFile, assignment.parent);
                }
                else {
                    const replacement = isObjectLiteralExpression(right) ? tryChangeModuleExportsObject(right, useSitesToUnqualify) : isRequireCall(right, 
                    /*checkArgumentIsStringLiteralLike*/
                    true) ? convertReExportAll(right.arguments[0], checker) : void 0;
                    if (replacement) {
                        changes.replaceNodeWithNodes(sourceFile, assignment.parent, replacement[0]);
                        return replacement[1];
                    }
                    else {
                        changes.replaceRangeWithText(sourceFile, createRange(left.getStart(sourceFile), right.pos), "export default");
                        return true;
                    }
                }
            }
            else if (isExportsOrModuleExportsOrAlias(sourceFile, left.expression)) {
                convertNamedExport(sourceFile, assignment, changes, exports);
            }
            return false;
        }