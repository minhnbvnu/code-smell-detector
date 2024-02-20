function classElementOrClassElementParameterIsDecorated(useLegacyDecorators, node, parent2) {
            let parameters;
            if (isAccessor(node)) {
                const { firstAccessor, secondAccessor, setAccessor } = getAllAccessorDeclarations(parent2.members, node);
                const firstAccessorWithDecorators = hasDecorators(firstAccessor) ? firstAccessor : secondAccessor && hasDecorators(secondAccessor) ? secondAccessor : void 0;
                if (!firstAccessorWithDecorators || node !== firstAccessorWithDecorators) {
                    return false;
                }
                parameters = setAccessor == null ? void 0 : setAccessor.parameters;
            }
            else if (isMethodDeclaration(node)) {
                parameters = node.parameters;
            }
            if (nodeIsDecorated(useLegacyDecorators, node, parent2)) {
                return true;
            }
            if (parameters) {
                for (const parameter of parameters) {
                    if (parameterIsThisKeyword(parameter))
                        continue;
                    if (nodeIsDecorated(useLegacyDecorators, parameter, node, parent2))
                        return true;
                }
            }
            return false;
        }