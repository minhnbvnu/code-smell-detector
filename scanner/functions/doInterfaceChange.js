function doInterfaceChange(changes, file, name, info) {
            var _a2;
            const { enclosingNode, selection, typeParameters, typeElements } = info;
            const newTypeNode = factory.createInterfaceDeclaration(
            /* modifiers */
            void 0, name, typeParameters, 
            /* heritageClauses */
            void 0, typeElements);
            setTextRange(newTypeNode, (_a2 = typeElements[0]) == null ? void 0 : _a2.parent);
            changes.insertNodeBefore(file, enclosingNode, ignoreSourceNewlines(newTypeNode), 
            /* blankLineBetween */
            true);
            changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map((id) => factory.createTypeReferenceNode(id.name, 
            /* typeArguments */
            void 0))), { leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.Exclude, trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.ExcludeWhitespace });
        }