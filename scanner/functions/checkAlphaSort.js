function checkAlphaSort(members, order) {
                let previousName = '';
                let isCorrectlySorted = true;
                // Find first member which isn't correctly sorted
                members.forEach(member => {
                    const name = getMemberName(member, context.getSourceCode());
                    // Note: Not all members have names
                    if (name) {
                        if (naturalOutOfOrder(name, previousName, order)) {
                            context.report({
                                node: member,
                                messageId: 'incorrectOrder',
                                data: {
                                    member: name,
                                    beforeMember: previousName,
                                },
                            });
                            isCorrectlySorted = false;
                        }
                        previousName = name;
                    }
                });
                return isCorrectlySorted;
            }