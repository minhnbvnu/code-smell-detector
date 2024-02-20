function findConstructorDeclaration(node) {
                const members = node.members;
                for (const member of members) {
                    if (member.kind === 173 /* Constructor */ && nodeIsPresent(member.body)) {
                        return member;
                    }
                }
            }