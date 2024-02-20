function emitNodeWithWriter(node, writer2) {
                if (!node)
                    return;
                const savedWrite = write;
                write = writer2;
                emit(node);
                write = savedWrite;
            }