function isNonStaticMethodOrAccessorWithPrivateName(member) {
            return !isStatic(member) && (isMethodOrAccessor(member) || isAutoAccessorPropertyDeclaration(member)) && isPrivateIdentifier(member.name);
        }