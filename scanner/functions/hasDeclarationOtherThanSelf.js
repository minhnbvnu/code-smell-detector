function hasDeclarationOtherThanSelf(member) {
                if (!length(member.declarations))
                    return true;
                return some(member.declarations, (decl) => decl.parent !== obj);
            }