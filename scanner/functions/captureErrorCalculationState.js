function captureErrorCalculationState() {
                    return {
                        errorInfo,
                        lastSkippedInfo,
                        incompatibleStack: incompatibleStack == null ? void 0 : incompatibleStack.slice(),
                        overrideNextErrorInfo,
                        relatedInfo: relatedInfo == null ? void 0 : relatedInfo.slice()
                    };
                }