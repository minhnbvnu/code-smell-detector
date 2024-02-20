function createGetSourceFile(readFile, getCompilerOptions, setParentNodes) {
            return (fileName, languageVersionOrOptions, onError) => {
                let text;
                try {
                    mark("beforeIORead");
                    text = readFile(fileName, getCompilerOptions().charset);
                    mark("afterIORead");
                    measure("I/O Read", "beforeIORead", "afterIORead");
                }
                catch (e) {
                    if (onError) {
                        onError(e.message);
                    }
                    text = "";
                }
                return text !== void 0 ? createSourceFile(fileName, text, languageVersionOrOptions, setParentNodes) : void 0;
            };
        }