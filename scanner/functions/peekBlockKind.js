function peekBlockKind() {
                const block = peekBlock();
                return block && block.kind;
            }