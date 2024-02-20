function deleteTypeParameters(changes, sourceFile, token) {
            changes.delete(sourceFile, Debug.checkDefined(cast(token.parent, isDeclarationWithTypeParameterChildren).typeParameters, "The type parameter to delete should exist"));
        }