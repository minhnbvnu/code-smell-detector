function doChange30(changes, sourceFile, { indexSignature, container }) {
            const members = isInterfaceDeclaration(container) ? container.members : container.type.members;
            const otherMembers = members.filter((member) => !isIndexSignatureDeclaration(member));
            const parameter = first(indexSignature.parameters);
            const mappedTypeParameter = factory.createTypeParameterDeclaration(
            /*modifiers*/
            void 0, cast(parameter.name, isIdentifier), parameter.type);
            const mappedIntersectionType = factory.createMappedTypeNode(hasEffectiveReadonlyModifier(indexSignature) ? factory.createModifier(146 /* ReadonlyKeyword */) : void 0, mappedTypeParameter, 
            /*nameType*/
            void 0, indexSignature.questionToken, indexSignature.type, 
            /*members*/
            void 0);
            const intersectionType = factory.createIntersectionTypeNode([
                ...getAllSuperTypeNodes(container),
                mappedIntersectionType,
                ...otherMembers.length ? [factory.createTypeLiteralNode(otherMembers)] : emptyArray
            ]);
            changes.replaceNode(sourceFile, container, createTypeAliasFromInterface(container, intersectionType));
        }