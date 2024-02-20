function isInternalModuleImportEqualsDeclaration(node) {
            return node.kind === 268 /* ImportEqualsDeclaration */ && node.moduleReference.kind !== 280 /* ExternalModuleReference */;
        }