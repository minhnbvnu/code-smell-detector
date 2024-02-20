function wrap_in_function(module_name) {
        return (context) => (root) => {
            const { factory } = context;
            const p = (name) => factory.createParameterDeclaration(undefined, undefined, name);
            const params = [p("require"), p("module"), p("exports"), p("__esModule"), p("__esExport")];
            const block = factory.createBlock(root.statements, true);
            const func = factory.createFunctionDeclaration(undefined, undefined, "_", undefined, params, undefined, block);
            typescript_1.default.addSyntheticLeadingComment(func, typescript_1.default.SyntaxKind.MultiLineCommentTrivia, ` ${module_name} `, false);
            return factory.updateSourceFile(root, [func]);
        };
    }