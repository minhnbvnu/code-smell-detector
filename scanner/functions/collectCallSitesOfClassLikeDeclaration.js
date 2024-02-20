function collectCallSitesOfClassLikeDeclaration(node, collect) {
            forEach(node.modifiers, collect);
            const heritage = getClassExtendsHeritageElement(node);
            if (heritage) {
                collect(heritage.expression);
            }
            for (const member of node.members) {
                if (canHaveModifiers(member)) {
                    forEach(member.modifiers, collect);
                }
                if (isPropertyDeclaration(member)) {
                    collect(member.initializer);
                }
                else if (isConstructorDeclaration(member) && member.body) {
                    forEach(member.parameters, collect);
                    collect(member.body);
                }
                else if (isClassStaticBlockDeclaration(member)) {
                    collect(member);
                }
            }
        }