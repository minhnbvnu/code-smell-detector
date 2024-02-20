function declarationBelongsToPrivateAmbientMember(declaration) {
                const root = getRootDeclaration(declaration);
                const memberDeclaration = root.kind === 166 /* Parameter */ ? root.parent : root;
                return isPrivateWithinAmbient(memberDeclaration);
            }