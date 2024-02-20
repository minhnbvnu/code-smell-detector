function unusedIsError(kind, isAmbient) {
                if (isAmbient) {
                    return false;
                }
                switch (kind) {
                    case 0 /* Local */:
                        return !!compilerOptions.noUnusedLocals;
                    case 1 /* Parameter */:
                        return !!compilerOptions.noUnusedParameters;
                    default:
                        return Debug.assertNever(kind);
                }
            }