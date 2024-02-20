function emitUnparsedSourceOrPrepend(unparsed) {
                for (const text of unparsed.texts) {
                    writeLine();
                    emit(text);
                }
            }