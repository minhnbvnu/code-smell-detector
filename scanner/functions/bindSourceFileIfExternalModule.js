function bindSourceFileIfExternalModule() {
                setExportContextFlag(file);
                if (isExternalModule(file)) {
                    bindSourceFileAsExternalModule();
                }
                else if (isJsonSourceFile(file)) {
                    bindSourceFileAsExternalModule();
                    const originalSymbol = file.symbol;
                    declareSymbol(file.symbol.exports, file.symbol, file, 4 /* Property */, 67108863 /* All */);
                    file.symbol = originalSymbol;
                }
            }