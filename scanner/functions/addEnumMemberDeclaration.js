function addEnumMemberDeclaration(changes, checker, { token, parentDeclaration }) {
            const hasStringInitializer = some(parentDeclaration.members, (member) => {
                const type = checker.getTypeAtLocation(member);
                return !!(type && type.flags & 402653316 /* StringLike */);
            });
            const enumMember = factory.createEnumMember(token, hasStringInitializer ? factory.createStringLiteral(token.text) : void 0);
            changes.replaceNode(parentDeclaration.getSourceFile(), parentDeclaration, factory.updateEnumDeclaration(parentDeclaration, parentDeclaration.modifiers, parentDeclaration.name, concatenate(parentDeclaration.members, singleElementArray(enumMember))), {
                leadingTriviaOption: ts_textChanges_exports.LeadingTriviaOption.IncludeAll,
                trailingTriviaOption: ts_textChanges_exports.TrailingTriviaOption.Exclude
            });
        }