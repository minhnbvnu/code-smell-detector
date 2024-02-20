function getModuleNames({ imports, moduleAugmentations }) {
            const res = imports.map((i) => i);
            for (const aug of moduleAugmentations) {
                if (aug.kind === 10 /* StringLiteral */) {
                    res.push(aug);
                }
            }
            return res;
        }