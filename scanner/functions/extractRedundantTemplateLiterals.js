function extractRedundantTemplateLiterals(types) {
                let i = types.length;
                const literals = filter(types, (t) => !!(t.flags & 128 /* StringLiteral */));
                while (i > 0) {
                    i--;
                    const t = types[i];
                    if (!(t.flags & 134217728 /* TemplateLiteral */))
                        continue;
                    for (const t2 of literals) {
                        if (isTypeSubtypeOf(t2, t)) {
                            orderedRemoveItemAt(types, i);
                            break;
                        }
                        else if (isPatternLiteralType(t)) {
                            return true;
                        }
                    }
                }
                return false;
            }