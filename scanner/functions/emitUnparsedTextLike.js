function emitUnparsedTextLike(unparsed) {
                const pos = getTextPosWithWriteLine();
                writeUnparsedNode(unparsed);
                if (bundleFileInfo) {
                    updateOrPushBundleFileTextLike(pos, writer.getTextPos(), unparsed.kind === 305 /* UnparsedText */ ? "text" /* Text */ : "internal" /* Internal */);
                }
            }