function getFirstConstructorWithBody(node) {
            return find(node.members, (member) => isConstructorDeclaration(member) && nodeIsPresent(member.body));
        }