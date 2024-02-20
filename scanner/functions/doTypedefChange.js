function doTypedefChange(changes, context, file, name, info) {
            var _a2;
            const { enclosingNode, selection, typeParameters } = info;
            setEmitFlags(selection, 3072 /* NoComments */ | 4096 /* NoNestedComments */);
            const node = factory.createJSDocTypedefTag(factory.createIdentifier("typedef"), factory.createJSDocTypeExpression(selection), factory.createIdentifier(name));
            const templates = [];
            forEach(typeParameters, (typeParameter) => {
                const constraint = getEffectiveConstraintOfTypeParameter(typeParameter);
                const parameter = factory.createTypeParameterDeclaration(
                /*modifiers*/
                void 0, typeParameter.name);
                const template = factory.createJSDocTemplateTag(factory.createIdentifier("template"), constraint && cast(constraint, isJSDocTypeExpression), [parameter]);
                templates.push(template);
            });
            const jsDoc = factory.createJSDocComment(
            /* comment */
            void 0, factory.createNodeArray(concatenate(templates, [node])));
            if (isJSDoc(enclosingNode)) {
                const pos = enclosingNode.getStart(file);
                const newLineCharacter = getNewLineOrDefaultFromHost(context.host, (_a2 = context.formatContext) == null ? void 0 : _a2.options);
                changes.insertNodeAt(file, enclosingNode.getStart(file), jsDoc, {
                    suffix: newLineCharacter + newLineCharacter + file.text.slice(getPrecedingNonSpaceCharacterPosition(file.text, pos - 1), pos)
                });
            }
            else {
                changes.insertNodeBefore(file, enclosingNode, jsDoc, 
                /* blankLineBetween */
                true);
            }
            changes.replaceNode(file, selection, factory.createTypeReferenceNode(name, typeParameters.map((id) => factory.createTypeReferenceNode(id.name, 
            /* typeArguments */
            void 0))));
        }