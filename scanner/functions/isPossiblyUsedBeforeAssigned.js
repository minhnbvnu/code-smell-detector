function isPossiblyUsedBeforeAssigned(node) {
                const declaration = util.getDeclaration(checker, node);
                if (!declaration) {
                    // don't know what the declaration is for some reason, so just assume the worst
                    return true;
                }
                if (
                // non-strict mode doesn't care about used before assigned errors
                (0, tsutils_1.isStrictCompilerOptionEnabled)(compilerOptions, 'strictNullChecks') &&
                    // ignore class properties as they are compile time guarded
                    // also ignore function arguments as they can't be used before defined
                    (0, tsutils_1.isVariableDeclaration)(declaration) &&
                    // is it `const x!: number`
                    declaration.initializer === undefined &&
                    declaration.exclamationToken === undefined &&
                    declaration.type !== undefined) {
                    // check if the defined variable type has changed since assignment
                    const declarationType = checker.getTypeFromTypeNode(declaration.type);
                    const type = util.getConstrainedTypeAtLocation(checker, node);
                    if (declarationType === type) {
                        // possibly used before assigned, so just skip it
                        // better to false negative and skip it, than false positive and fix to compile erroring code
                        //
                        // no better way to figure this out right now
                        // https://github.com/Microsoft/TypeScript/issues/31124
                        return true;
                    }
                }
                return false;
            }