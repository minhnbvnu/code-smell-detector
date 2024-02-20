function isExternalModuleImportEquals(eq) {
            return eq.moduleReference.kind === 280 /* ExternalModuleReference */ && eq.moduleReference.expression.kind === 10 /* StringLiteral */;
        }