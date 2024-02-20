function recordBundleFileInternalSectionEnd(prevSourceFileTextKind) {
                if (prevSourceFileTextKind) {
                    recordBundleFileTextLikeSection(writer.getTextPos());
                    sourceFileTextPos = getTextPosWithWriteLine();
                    sourceFileTextKind = prevSourceFileTextKind;
                }
            }