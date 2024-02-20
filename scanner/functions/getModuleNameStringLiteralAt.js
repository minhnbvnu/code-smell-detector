function getModuleNameStringLiteralAt({ imports, moduleAugmentations }, index) {
            if (index < imports.length)
                return imports[index];
            let augIndex = imports.length;
            for (const aug of moduleAugmentations) {
                if (aug.kind === 10 /* StringLiteral */) {
                    if (index === augIndex)
                        return aug;
                    augIndex++;
                }
            }
            Debug.fail("should never ask for module name at index higher than possible module name");
        }