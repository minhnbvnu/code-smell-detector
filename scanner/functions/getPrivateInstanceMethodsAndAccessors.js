function getPrivateInstanceMethodsAndAccessors(node) {
                return filter(node.members, isNonStaticMethodOrAccessorWithPrivateName);
            }