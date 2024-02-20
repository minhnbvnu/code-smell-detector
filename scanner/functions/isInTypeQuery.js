function isInTypeQuery(node) {
                return !!findAncestor(node, (n) => n.kind === 183 /* TypeQuery */ ? true : n.kind === 79 /* Identifier */ || n.kind === 163 /* QualifiedName */ ? false : "quit");
            }