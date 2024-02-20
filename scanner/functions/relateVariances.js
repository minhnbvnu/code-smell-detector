function relateVariances(sourceTypeArguments, targetTypeArguments, variances, intersectionState2) {
                        if (result2 = typeArgumentsRelatedTo(sourceTypeArguments, targetTypeArguments, variances, reportErrors2, intersectionState2)) {
                            return result2;
                        }
                        if (some(variances, (v) => !!(v & 24 /* AllowsStructuralFallback */))) {
                            originalErrorInfo = void 0;
                            resetErrorInfo(saveErrorInfo);
                            return void 0;
                        }
                        const allowStructuralFallback = targetTypeArguments && hasCovariantVoidArgument(targetTypeArguments, variances);
                        varianceCheckFailed = !allowStructuralFallback;
                        if (variances !== emptyArray && !allowStructuralFallback) {
                            if (varianceCheckFailed && !(reportErrors2 && some(variances, (v) => (v & 7 /* VarianceMask */) === 0 /* Invariant */))) {
                                return 0 /* False */;
                            }
                            originalErrorInfo = errorInfo;
                            resetErrorInfo(saveErrorInfo);
                        }
                    }