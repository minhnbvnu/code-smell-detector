function getNamespaceMembersForSerialization(symbol) {
                        return !symbol.exports ? [] : filter(arrayFrom(symbol.exports.values()), isNamespaceMember);
                    }