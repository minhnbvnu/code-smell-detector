function emitUnparsedPrologues(prologues, seenPrologueDirectives) {
                for (const prologue of prologues) {
                    if (!seenPrologueDirectives.has(prologue.data)) {
                        writeLine();
                        const pos = writer.getTextPos();
                        emit(prologue);
                        if (bundleFileInfo)
                            bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "prologue" /* Prologue */, data: prologue.data });
                        if (seenPrologueDirectives) {
                            seenPrologueDirectives.add(prologue.data);
                        }
                    }
                }
            }