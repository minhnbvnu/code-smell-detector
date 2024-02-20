function makeName(name) {
                const autoGenerate = name.emitNode.autoGenerate;
                const prefix = formatGeneratedNamePart(autoGenerate.prefix, generateName);
                const suffix = formatGeneratedNamePart(autoGenerate.suffix);
                switch (autoGenerate.flags & 7 /* KindMask */) {
                    case 1 /* Auto */:
                        return makeTempVariableName(0 /* Auto */, !!(autoGenerate.flags & 8 /* ReservedInNestedScopes */), isPrivateIdentifier(name), prefix, suffix);
                    case 2 /* Loop */:
                        Debug.assertNode(name, isIdentifier);
                        return makeTempVariableName(268435456 /* _i */, !!(autoGenerate.flags & 8 /* ReservedInNestedScopes */), 
                        /*privateName*/
                        false, prefix, suffix);
                    case 3 /* Unique */:
                        return makeUniqueName2(idText(name), autoGenerate.flags & 32 /* FileLevel */ ? isFileLevelUniqueName2 : isUniqueName, !!(autoGenerate.flags & 16 /* Optimistic */), !!(autoGenerate.flags & 8 /* ReservedInNestedScopes */), isPrivateIdentifier(name), prefix, suffix);
                }
                return Debug.fail(`Unsupported GeneratedIdentifierKind: ${Debug.formatEnum(autoGenerate.flags & 7 /* KindMask */, GeneratedIdentifierFlags, 
                /*isFlags*/
                true)}.`);
            }