function isInitializedOrStaticProperty(member, requireInitializer, isStatic2) {
            return isPropertyDeclaration(member) && (!!member.initializer || !requireInitializer) && hasStaticModifier(member) === isStatic2;
        }