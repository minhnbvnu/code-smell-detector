function getDescriptionForClassLikeDeclaration(scope) {
            return scope.kind === 260 /* ClassDeclaration */ ? scope.name ? `class '${scope.name.text}'` : "anonymous class declaration" : scope.name ? `class expression '${scope.name.text}'` : "anonymous class expression";
        }