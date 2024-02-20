function checkGroupSort(members, groupOrder, supportsModifiers) {
                const previousRanks = [];
                const memberGroups = [];
                let isCorrectlySorted = true;
                // Find first member which isn't correctly sorted
                members.forEach(member => {
                    const rank = getRank(member, groupOrder, supportsModifiers);
                    const name = getMemberName(member, context.getSourceCode());
                    const rankLastMember = previousRanks[previousRanks.length - 1];
                    if (rank === -1) {
                        return;
                    }
                    // Works for 1st item because x < undefined === false for any x (typeof string)
                    if (rank < rankLastMember) {
                        context.report({
                            node: member,
                            messageId: 'incorrectGroupOrder',
                            data: {
                                name,
                                rank: getLowestRank(previousRanks, rank, groupOrder),
                            },
                        });
                        isCorrectlySorted = false;
                    }
                    else if (rank === rankLastMember) {
                        // Same member group --> Push to existing member group array
                        memberGroups[memberGroups.length - 1].push(member);
                    }
                    else {
                        // New member group --> Create new member group array
                        previousRanks.push(rank);
                        memberGroups.push([member]);
                    }
                });
                return isCorrectlySorted ? memberGroups : null;
            }