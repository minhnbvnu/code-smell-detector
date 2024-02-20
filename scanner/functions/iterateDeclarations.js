function* iterateDeclarations(variable) {
                if ((options === null || options === void 0 ? void 0 : options.builtinGlobals) &&
                    'eslintImplicitGlobalSetting' in variable &&
                    (variable.eslintImplicitGlobalSetting === 'readonly' ||
                        variable.eslintImplicitGlobalSetting === 'writable')) {
                    yield { type: 'builtin' };
                }
                if ('eslintExplicitGlobalComments' in variable &&
                    variable.eslintExplicitGlobalComments) {
                    for (const comment of variable.eslintExplicitGlobalComments) {
                        yield {
                            type: 'comment',
                            node: comment,
                            loc: util.getNameLocationInGlobalDirectiveComment(sourceCode, comment, variable.name),
                        };
                    }
                }
                const identifiers = variable.identifiers
                    .map(id => ({
                    identifier: id,
                    parent: id.parent,
                }))
                    // ignore function declarations because TS will treat them as an overload
                    .filter(({ parent }) => parent.type !== utils_1.AST_NODE_TYPES.TSDeclareFunction);
                if (options.ignoreDeclarationMerge && identifiers.length > 1) {
                    if (
                    // interfaces merging
                    identifiers.every(({ parent }) => parent.type === utils_1.AST_NODE_TYPES.TSInterfaceDeclaration)) {
                        return;
                    }
                    if (
                    // namespace/module merging
                    identifiers.every(({ parent }) => parent.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration)) {
                        return;
                    }
                    if (
                    // class + interface/namespace merging
                    identifiers.every(({ parent }) => CLASS_DECLARATION_MERGE_NODES.has(parent.type))) {
                        const classDecls = identifiers.filter(({ parent }) => parent.type === utils_1.AST_NODE_TYPES.ClassDeclaration);
                        if (classDecls.length === 1) {
                            // safe declaration merging
                            return;
                        }
                        // there's more than one class declaration, which needs to be reported
                        for (const { identifier } of classDecls) {
                            yield { type: 'syntax', node: identifier, loc: identifier.loc };
                        }
                        return;
                    }
                    if (
                    // class + interface/namespace merging
                    identifiers.every(({ parent }) => FUNCTION_DECLARATION_MERGE_NODES.has(parent.type))) {
                        const functionDecls = identifiers.filter(({ parent }) => parent.type === utils_1.AST_NODE_TYPES.FunctionDeclaration);
                        if (functionDecls.length === 1) {
                            // safe declaration merging
                            return;
                        }
                        // there's more than one function declaration, which needs to be reported
                        for (const { identifier } of functionDecls) {
                            yield { type: 'syntax', node: identifier, loc: identifier.loc };
                        }
                        return;
                    }
                    if (
                    // enum + namespace merging
                    identifiers.every(({ parent }) => ENUM_DECLARATION_MERGE_NODES.has(parent.type))) {
                        const enumDecls = identifiers.filter(({ parent }) => parent.type === utils_1.AST_NODE_TYPES.TSEnumDeclaration);
                        if (enumDecls.length === 1) {
                            // safe declaration merging
                            return;
                        }
                        // there's more than one enum declaration, which needs to be reported
                        for (const { identifier } of enumDecls) {
                            yield { type: 'syntax', node: identifier, loc: identifier.loc };
                        }
                        return;
                    }
                }
                for (const { identifier } of identifiers) {
                    yield { type: 'syntax', node: identifier, loc: identifier.loc };
                }
            }