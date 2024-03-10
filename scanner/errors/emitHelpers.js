function emitHelpers(node) {
                let helpersEmitted = false;
                const bundle = node.kind === 309 /* Bundle */ ? node : void 0;
                if (bundle && moduleKind === 0 /* None */) {
                    return;
                }
                const numPrepends = bundle ? bundle.prepends.length : 0;
                const numNodes = bundle ? bundle.sourceFiles.length + numPrepends : 1;
                for (let i = 0; i < numNodes; i++) {
                    const currentNode = bundle ? i < numPrepends ? bundle.prepends[i] : bundle.sourceFiles[i - numPrepends] : node;
                    const sourceFile = isSourceFile(currentNode) ? currentNode : isUnparsedSource(currentNode) ? void 0 : currentSourceFile;
                    const shouldSkip = printerOptions.noEmitHelpers || !!sourceFile && hasRecordedExternalHelpers(sourceFile);
                    const shouldBundle = (isSourceFile(currentNode) || isUnparsedSource(currentNode)) && !isOwnFileEmit;
                    const helpers = isUnparsedSource(currentNode) ? currentNode.helpers : getSortedEmitHelpers(currentNode);
                    if (helpers) {
                        for (const helper of helpers) {
                            if (!helper.scoped) {
                                if (shouldSkip)
                                    continue;
                                if (shouldBundle) {
                                    if (bundledHelpers.get(helper.name)) {
                                        continue;
                                    }
                                    bundledHelpers.set(helper.name, true);
                                }
                            }
                            else if (bundle) {
                                continue;
                            }
                            const pos = getTextPosWithWriteLine();
                            if (typeof helper.text === "string") {
                                writeLines(helper.text);
                            }
                            else {
                                writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                            }
                            if (bundleFileInfo)
                                bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "emitHelpers" /* EmitHelpers */, data: helper.name });
                            helpersEmitted = true;
                        }
                    }
                }
                return helpersEmitted;
            }