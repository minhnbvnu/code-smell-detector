function createAddIndexSignatureAction(context, sourceFile, node, tokenName, typeNode) {
            const stringTypeNode = factory.createKeywordTypeNode(152 /* StringKeyword */);
            const indexingParameter = factory.createParameterDeclaration(
            /*modifiers*/
            void 0, 
            /*dotDotDotToken*/
            void 0, "x", 
            /*questionToken*/
            void 0, stringTypeNode, 
            /*initializer*/
            void 0);
            const indexSignature = factory.createIndexSignature(
            /*modifiers*/
            void 0, [indexingParameter], typeNode);
            const changes = ts_textChanges_exports.ChangeTracker.with(context, (t) => t.insertMemberAtStart(sourceFile, node, indexSignature));
            return createCodeFixActionWithoutFixAll(fixMissingMember, changes, [Diagnostics.Add_index_signature_for_property_0, tokenName]);
        }