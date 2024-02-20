function changeNamedToDefaultImport(importingSourceFile, ref, changes) {
            const parent2 = ref.parent;
            switch (parent2.kind) {
                case 208 /* PropertyAccessExpression */:
                    changes.replaceNode(importingSourceFile, ref, factory.createIdentifier("default"));
                    break;
                case 273 /* ImportSpecifier */: {
                    const defaultImport = factory.createIdentifier(parent2.name.text);
                    if (parent2.parent.elements.length === 1) {
                        changes.replaceNode(importingSourceFile, parent2.parent, defaultImport);
                    }
                    else {
                        changes.delete(importingSourceFile, parent2);
                        changes.insertNodeBefore(importingSourceFile, parent2.parent, defaultImport);
                    }
                    break;
                }
                case 278 /* ExportSpecifier */: {
                    changes.replaceNode(importingSourceFile, parent2, makeExportSpecifier("default", parent2.name.text));
                    break;
                }
                default:
                    Debug.assertNever(parent2, `Unexpected parent kind ${parent2.kind}`);
            }
        }