function isNamedMember(member, escapedName) {
                return !isReservedMemberName(escapedName) && symbolIsValue(member);
            }