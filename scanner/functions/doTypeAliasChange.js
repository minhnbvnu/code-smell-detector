function doTypeAliasChange(changes, file, name, info) {
            const { enclosingNode, selection, typeParameters } = info;
            const newTypeNode = factory.createTypeAliasDeclaration(
            /* modifiers */
            void 0, name, typeParameters.map((id) => factory.updateTypeParameterDeclaration(id, id.modifiers, id.name, id.constraint, 
            /* defaultType */
            void 0)), selection);
            changes.insertNodeBefore(file, enclosingNode, ignoreSourceNewlines(newTypeNode), 
            /* blankLineBetween */
            true);
            changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map((id) => factory.createTypeReferenceNode(id.name, 
            /* typeArguments */
            void 0))), { leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude, trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.ExcludeWhitespace });
        }