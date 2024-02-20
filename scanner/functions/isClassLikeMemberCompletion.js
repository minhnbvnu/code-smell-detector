function isClassLikeMemberCompletion(symbol, location, sourceFile) {
            if (isInJSFile(location)) {
                return false;
            }
            const memberFlags = 106500 /* ClassMember */ & 900095 /* EnumMemberExcludes */;
            return !!(symbol.flags & memberFlags) && (isClassLike(location) || location.parent && location.parent.parent && isClassElement(location.parent) && location === location.parent.name && location.parent.getLastToken(sourceFile) === location.parent.name && isClassLike(location.parent.parent) || location.parent && isSyntaxList(location) && isClassLike(location.parent));
        }