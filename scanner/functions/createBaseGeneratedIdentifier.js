function createBaseGeneratedIdentifier(text, autoGenerateFlags, prefix, suffix) {
                const node = createBaseIdentifier(escapeLeadingUnderscores(text));
                setIdentifierAutoGenerate(node, {
                    flags: autoGenerateFlags,
                    id: nextAutoGenerateId,
                    prefix,
                    suffix
                });
                nextAutoGenerateId++;
                return node;
            }