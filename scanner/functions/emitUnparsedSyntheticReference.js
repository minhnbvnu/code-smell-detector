function emitUnparsedSyntheticReference(unparsed) {
                const pos = getTextPosWithWriteLine();
                writeUnparsedNode(unparsed);
                if (bundleFileInfo) {
                    const section = clone(unparsed.section);
                    section.pos = pos;
                    section.end = writer.getTextPos();
                    bundleFileInfo.sections.push(section);
                }
            }