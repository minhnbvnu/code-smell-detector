function getDescriptionForModuleLikeDeclaration(scope) {
            return scope.kind === 265 /* ModuleBlock */ ? `namespace '${scope.parent.name.getText()}'` : scope.externalModuleIndicator ? 0 /* Module */ : 1 /* Global */;
        }