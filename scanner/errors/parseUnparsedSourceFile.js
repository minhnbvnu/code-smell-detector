function parseUnparsedSourceFile(bundleFileInfo, stripInternal, length2) {
            let prologues;
            let helpers;
            let referencedFiles;
            let typeReferenceDirectives;
            let libReferenceDirectives;
            let prependChildren;
            let texts;
            let hasNoDefaultLib;
            for (const section of bundleFileInfo ? bundleFileInfo.sections : emptyArray) {
                switch (section.kind) {
                    case "prologue" /* Prologue */:
                        prologues = append(prologues, setTextRange(factory.createUnparsedPrologue(section.data), section));
                        break;
                    case "emitHelpers" /* EmitHelpers */:
                        helpers = append(helpers, getAllUnscopedEmitHelpers().get(section.data));
                        break;
                    case "no-default-lib" /* NoDefaultLib */:
                        hasNoDefaultLib = true;
                        break;
                    case "reference" /* Reference */:
                        referencedFiles = append(referencedFiles, { pos: -1, end: -1, fileName: section.data });
                        break;
                    case "type" /* Type */:
                        typeReferenceDirectives = append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data });
                        break;
                    case "type-import" /* TypeResolutionModeImport */:
                        typeReferenceDirectives = append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data, resolutionMode: 99 /* ESNext */ });
                        break;
                    case "type-require" /* TypeResolutionModeRequire */:
                        typeReferenceDirectives = append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data, resolutionMode: 1 /* CommonJS */ });
                        break;
                    case "lib" /* Lib */:
                        libReferenceDirectives = append(libReferenceDirectives, { pos: -1, end: -1, fileName: section.data });
                        break;
                    case "prepend" /* Prepend */:
                        let prependTexts;
                        for (const text of section.texts) {
                            if (!stripInternal || text.kind !== "internal" /* Internal */) {
                                prependTexts = append(prependTexts, setTextRange(factory.createUnparsedTextLike(text.data, text.kind === "internal" /* Internal */), text));
                            }
                        }
                        prependChildren = addRange(prependChildren, prependTexts);
                        texts = append(texts, factory.createUnparsedPrepend(section.data, prependTexts != null ? prependTexts : emptyArray));
                        break;
                    case "internal" /* Internal */:
                        if (stripInternal) {
                            if (!texts)
                                texts = [];
                            break;
                        }
                    case "text" /* Text */:
                        texts = append(texts, setTextRange(factory.createUnparsedTextLike(section.data, section.kind === "internal" /* Internal */), section));
                        break;
                    default:
                        Debug.assertNever(section);
                }
            }
            if (!texts) {
                const textNode = factory.createUnparsedTextLike(
                /*data*/
                void 0, 
                /*internal*/
                false);
                setTextRangePosWidth(textNode, 0, typeof length2 === "function" ? length2() : length2);
                texts = [textNode];
            }
            const node = parseNodeFactory.createUnparsedSource(prologues != null ? prologues : emptyArray, 
            /*syntheticReferences*/
            void 0, texts);
            setEachParent(prologues, node);
            setEachParent(texts, node);
            setEachParent(prependChildren, node);
            node.hasNoDefaultLib = hasNoDefaultLib;
            node.helpers = helpers;
            node.referencedFiles = referencedFiles || emptyArray;
            node.typeReferenceDirectives = typeReferenceDirectives;
            node.libReferenceDirectives = libReferenceDirectives || emptyArray;
            return node;
        }