function isDecoratedClassElement(member, isStaticElement, parent2) {
                return nodeOrChildIsDecorated(
                /*legacyDecorators*/
                true, member, parent2) && isStaticElement === isStatic(member);
            }