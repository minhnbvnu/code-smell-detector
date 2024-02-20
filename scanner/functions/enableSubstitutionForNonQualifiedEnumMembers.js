function enableSubstitutionForNonQualifiedEnumMembers() {
                if ((enabledSubstitutions & 8 /* NonQualifiedEnumMembers */) === 0) {
                    enabledSubstitutions |= 8 /* NonQualifiedEnumMembers */;
                    context.enableSubstitution(79 /* Identifier */);
                }
            }