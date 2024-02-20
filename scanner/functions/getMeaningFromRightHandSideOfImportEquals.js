function getMeaningFromRightHandSideOfImportEquals(node) {
            const name = node.kind === 163 /* QualifiedName */ ? node : isQualifiedName(node.parent) && node.parent.right === node ? node.parent : void 0;
            return name && name.parent.kind === 268 /* ImportEqualsDeclaration */ ? 7 /* All */ : 4 /* Namespace */;
        }