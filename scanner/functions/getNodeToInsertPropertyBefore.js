function getNodeToInsertPropertyBefore(maxPos, scope) {
            const members = scope.members;
            Debug.assert(members.length > 0, "Found no members");
            let prevMember;
            let allProperties = true;
            for (const member of members) {
                if (member.pos > maxPos) {
                    return prevMember || members[0];
                }
                if (allProperties && !isPropertyDeclaration(member)) {
                    if (prevMember !== void 0) {
                        return member;
                    }
                    allProperties = false;
                }
                prevMember = member;
            }
            if (prevMember === void 0)
                return Debug.fail();
            return prevMember;
        }