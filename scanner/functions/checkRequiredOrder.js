function checkRequiredOrder(members, optionalityOrder) {
                const switchIndex = members.findIndex((member, i) => i && isMemberOptional(member) !== isMemberOptional(members[i - 1]));
                const report = (member) => context.report({
                    messageId: 'incorrectRequiredMembersOrder',
                    loc: member.loc,
                    data: {
                        member: getMemberName(member, context.getSourceCode()),
                        optionalOrRequired: optionalityOrder === 'required-first' ? 'required' : 'optional',
                    },
                });
                // if the optionality of the first item is correct (based on optionalityOrder)
                // then the first 0 inclusive to switchIndex exclusive members all
                // have the correct optionality
                if (isMemberOptional(members[0]) !==
                    (optionalityOrder === 'optional-first')) {
                    report(members[0]);
                    return false;
                }
                for (let i = switchIndex + 1; i < members.length; i++) {
                    if (isMemberOptional(members[i]) !==
                        isMemberOptional(members[switchIndex])) {
                        report(members[switchIndex]);
                        return false;
                    }
                }
                return true;
            }