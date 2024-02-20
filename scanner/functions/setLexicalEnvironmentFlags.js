function setLexicalEnvironmentFlags(flags, value) {
                lexicalEnvironmentFlags = value ? lexicalEnvironmentFlags | flags : lexicalEnvironmentFlags & ~flags;
            }