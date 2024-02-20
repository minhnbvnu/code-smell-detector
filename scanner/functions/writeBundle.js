function writeBundle(bundle, output, sourceMapGenerator2) {
                isOwnFileEmit = false;
                const previousWriter = writer;
                setWriter(output, sourceMapGenerator2);
                emitShebangIfNeeded(bundle);
                emitPrologueDirectivesIfNeeded(bundle);
                emitHelpers(bundle);
                emitSyntheticTripleSlashReferencesIfNeeded(bundle);
                for (const prepend of bundle.prepends) {
                    writeLine();
                    const pos = writer.getTextPos();
                    const savedSections = bundleFileInfo && bundleFileInfo.sections;
                    if (savedSections)
                        bundleFileInfo.sections = [];
                    print(4 /* Unspecified */, prepend, 
                    /*sourceFile*/
                    void 0);
                    if (bundleFileInfo) {
                        const newSections = bundleFileInfo.sections;
                        bundleFileInfo.sections = savedSections;
                        if (prepend.oldFileOfCurrentEmit)
                            bundleFileInfo.sections.push(...newSections);
                        else {
                            newSections.forEach((section) => Debug.assert(isBundleFileTextLike(section)));
                            bundleFileInfo.sections.push({
                                pos,
                                end: writer.getTextPos(),
                                kind: "prepend" /* Prepend */,
                                data: relativeToBuildInfo(prepend.fileName),
                                texts: newSections
                            });
                        }
                    }
                }
                sourceFileTextPos = getTextPosWithWriteLine();
                for (const sourceFile of bundle.sourceFiles) {
                    print(0 /* SourceFile */, sourceFile, sourceFile);
                }
                if (bundleFileInfo && bundle.sourceFiles.length) {
                    const end = writer.getTextPos();
                    if (recordBundleFileTextLikeSection(end)) {
                        const prologues = getPrologueDirectivesFromBundledSourceFiles(bundle);
                        if (prologues) {
                            if (!bundleFileInfo.sources)
                                bundleFileInfo.sources = {};
                            bundleFileInfo.sources.prologues = prologues;
                        }
                        const helpers = getHelpersFromBundledSourceFiles(bundle);
                        if (helpers) {
                            if (!bundleFileInfo.sources)
                                bundleFileInfo.sources = {};
                            bundleFileInfo.sources.helpers = helpers;
                        }
                    }
                }
                reset2();
                writer = previousWriter;
            }