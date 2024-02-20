function createBaseGeneratedPrivateIdentifier(text, autoGenerateFlags, prefix, suffix) {
                const node = createBasePrivateIdentifier(escapeLeadingUnderscores(text));
                setIdentifierAutoGenerate(node, {
                    flags: autoGenerateFlags,
                    id: nextAutoGenerateId,
                    prefix,
                    suffix
                });
                nextAutoGenerateId++;
                return node;
            }