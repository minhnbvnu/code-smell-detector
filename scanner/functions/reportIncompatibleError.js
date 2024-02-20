function reportIncompatibleError(message, arg0, arg1, arg2, arg3) {
                    overrideNextErrorInfo++;
                    lastSkippedInfo = void 0;
                    (incompatibleStack || (incompatibleStack = [])).push([message, arg0, arg1, arg2, arg3]);
                }