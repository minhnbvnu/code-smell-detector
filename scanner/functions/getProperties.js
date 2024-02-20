function getProperties(node, requireInitializer, isStatic2) {
            return filter(node.members, (m) => isInitializedOrStaticProperty(m, requireInitializer, isStatic2));
        }