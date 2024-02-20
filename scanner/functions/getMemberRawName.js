function getMemberRawName(member, sourceCode) {
        const { name, type } = util.getNameFromMember(member, sourceCode);
        if (type === util.MemberNameType.Quoted) {
            return name.slice(1, -1);
        }
        if (type === util.MemberNameType.Private) {
            return name.slice(1);
        }
        return name;
    }