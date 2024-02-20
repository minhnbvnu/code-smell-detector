function getLeftSideOfImportEqualsOrExportAssignment(nodeOnRightSide) {
                while (nodeOnRightSide.parent.kind === 163 /* QualifiedName */) {
                    nodeOnRightSide = nodeOnRightSide.parent;
                }
                if (nodeOnRightSide.parent.kind === 268 /* ImportEqualsDeclaration */) {
                    return nodeOnRightSide.parent.moduleReference === nodeOnRightSide ? nodeOnRightSide.parent : void 0;
                }
                if (nodeOnRightSide.parent.kind === 274 /* ExportAssignment */) {
                    return nodeOnRightSide.parent.expression === nodeOnRightSide ? nodeOnRightSide.parent : void 0;
                }
                return void 0;
            }