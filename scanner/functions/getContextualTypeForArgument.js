function getContextualTypeForArgument(callTarget, arg) {
                const args = getEffectiveCallArguments(callTarget);
                const argIndex = args.indexOf(arg);
                return argIndex === -1 ? void 0 : getContextualTypeForArgumentAtIndex(callTarget, argIndex);
            }