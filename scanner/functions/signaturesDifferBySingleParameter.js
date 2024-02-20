function signaturesDifferBySingleParameter(types1, types2) {
                const index = getIndexOfFirstDifference(types1, types2, parametersAreEqual);
                if (index === undefined) {
                    return undefined;
                }
                // If remaining arrays are equal, the signatures differ by just one parameter type
                if (!util.arraysAreEqual(types1.slice(index + 1), types2.slice(index + 1), parametersAreEqual)) {
                    return undefined;
                }
                const a = types1[index];
                const b = types2[index];
                // Can unify `a?: string` and `b?: number`. Can't unify `...args: string[]` and `...args: number[]`.
                // See https://github.com/Microsoft/TypeScript/issues/5077
                return parametersHaveEqualSigils(a, b) &&
                    a.type !== utils_1.AST_NODE_TYPES.RestElement
                    ? { kind: 'single-parameter-difference', p0: a, p1: b }
                    : undefined;
            }