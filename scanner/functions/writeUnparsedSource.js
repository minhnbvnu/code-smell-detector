function writeUnparsedSource(unparsed, output) {
                const previousWriter = writer;
                setWriter(output, 
                /*_sourceMapGenerator*/
                void 0);
                print(4 /* Unspecified */, unparsed, 
                /*sourceFile*/
                void 0);
                reset2();
                writer = previousWriter;
            }