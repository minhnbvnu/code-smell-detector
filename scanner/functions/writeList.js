function writeList(format, nodes, sourceFile, output) {
                const previousWriter = writer;
                setWriter(output, 
                /*_sourceMapGenerator*/
                void 0);
                if (sourceFile) {
                    setSourceFile(sourceFile);
                }
                emitList(
                /*parentNode*/
                void 0, nodes, format);
                reset2();
                writer = previousWriter;
            }