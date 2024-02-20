function parseOldFileOfCurrentEmit(bundleFileInfo) {
            let texts;
            let syntheticReferences;
            for (const section of bundleFileInfo.sections) {
                switch (section.kind) {
                    case "internal" /* Internal */:
                    case "text" /* Text */:
                        texts = append(texts, setTextRange(factory.createUnparsedTextLike(section.data, section.kind === "internal" /* Internal */), section));
                        break;
                    case "no-default-lib" /* NoDefaultLib */:
                    case "reference" /* Reference */:
                    case "type" /* Type */:
                    case "type-import" /* TypeResolutionModeImport */:
                    case "type-require" /* TypeResolutionModeRequire */:
                    case "lib" /* Lib */:
                        syntheticReferences = append(syntheticReferences, setTextRange(factory.createUnparsedSyntheticReference(section), section));
                        break;
                    case "prologue" /* Prologue */:
                    case "emitHelpers" /* EmitHelpers */:
                    case "prepend" /* Prepend */:
                        break;
                    default:
                        Debug.assertNever(section);
                }
            }
            const node = factory.createUnparsedSource(emptyArray, syntheticReferences, texts != null ? texts : emptyArray);
            setEachParent(syntheticReferences, node);
            setEachParent(texts, node);
            node.helpers = map(bundleFileInfo.sources && bundleFileInfo.sources.helpers, (name) => getAllUnscopedEmitHelpers().get(name));
            return node;
        }