function recordBundleFileInternalSectionStart(node) {
                if (recordInternalSection && bundleFileInfo && currentSourceFile && (isDeclaration(node) || isVariableStatement(node)) && isInternalDeclaration(node, currentSourceFile) && sourceFileTextKind !== "internal" /* Internal */) {
                    const prevSourceFileTextKind = sourceFileTextKind;
                    recordBundleFileTextLikeSection(writer.getTextPos());
                    sourceFileTextPos = getTextPosWithWriteLine();
                    sourceFileTextKind = "internal" /* Internal */;
                    return prevSourceFileTextKind;
                }
                return void 0;
            }