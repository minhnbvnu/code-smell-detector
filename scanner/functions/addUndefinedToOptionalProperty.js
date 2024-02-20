function addUndefinedToOptionalProperty(changes, toAdd) {
            for (const add of toAdd) {
                const d = add.valueDeclaration;
                if (d && (isPropertySignature(d) || isPropertyDeclaration(d)) && d.type) {
                    const t = factory.createUnionTypeNode([
                        ...d.type.kind === 189 /* UnionType */ ? d.type.types : [d.type],
                        factory.createTypeReferenceNode("undefined")
                    ]);
                    changes.replaceNode(d.getSourceFile(), d.type, t);
                }
            }
        }