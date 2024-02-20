function emitSnippetNode(hint, node, snippet) {
                switch (snippet.kind) {
                    case 1 /* Placeholder */:
                        emitPlaceholder(hint, node, snippet);
                        break;
                    case 0 /* TabStop */:
                        emitTabStop(hint, node, snippet);
                        break;
                }
            }