function checkUnreachable(node) {
                if (!(currentFlow.flags & 1 /* Unreachable */)) {
                    return false;
                }
                if (currentFlow === unreachableFlow) {
                    const reportError = (
                    // report error on all statements except empty ones
                    isStatementButNotDeclaration(node) && node.kind !== 239 /* EmptyStatement */ || // report error on class declarations
                        node.kind === 260 /* ClassDeclaration */ || // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                        node.kind === 264 /* ModuleDeclaration */ && shouldReportErrorOnModuleDeclaration(node));
                    if (reportError) {
                        currentFlow = reportedUnreachableFlow;
                        if (!options.allowUnreachableCode) {
                            const isError = unreachableCodeIsError(options) && !(node.flags & 16777216 /* Ambient */) && (!isVariableStatement(node) || !!(getCombinedNodeFlags(node.declarationList) & 3 /* BlockScoped */) || node.declarationList.declarations.some((d) => !!d.initializer));
                            eachUnreachableRange(node, (start, end) => errorOrSuggestionOnRange(isError, start, end, Diagnostics.Unreachable_code_detected));
                        }
                    }
                }
                return true;
            }