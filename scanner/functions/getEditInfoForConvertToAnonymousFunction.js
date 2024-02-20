function getEditInfoForConvertToAnonymousFunction(context, func) {
            const { file } = context;
            const body = convertToBlock(func.body);
            const newNode = factory.createFunctionExpression(func.modifiers, func.asteriskToken, 
            /* name */
            void 0, func.typeParameters, func.parameters, func.type, body);
            return ts_textChanges_exports.ChangeTracker.with(context, (t) => t.replaceNode(file, func, newNode));
        }