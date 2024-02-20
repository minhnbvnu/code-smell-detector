function isValidDeclarationForTupleLabel(d) {
                return d.kind === 199 /* NamedTupleMember */ || isParameter(d) && d.name && isIdentifier(d.name);
            }