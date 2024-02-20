function tryGetSourcePosition(info) {
                if (!isDeclarationFileName(info.fileName))
                    return void 0;
                const file = getSourceFile(info.fileName);
                if (!file)
                    return void 0;
                const newLoc = getDocumentPositionMapper2(info.fileName).getSourcePosition(info);
                return !newLoc || newLoc === info ? void 0 : tryGetSourcePosition(newLoc) || newLoc;
            }