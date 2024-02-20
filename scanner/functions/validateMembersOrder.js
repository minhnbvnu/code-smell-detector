function validateMembersOrder(members, orderConfig, supportsModifiers) {
                if (orderConfig === 'never') {
                    return;
                }
                // Standardize config
                let order;
                let memberTypes;
                let optionalityOrder;
                // returns true if everything is good and false if an error was reported
                const checkOrder = (memberSet) => {
                    const hasAlphaSort = !!(order && order !== 'as-written');
                    // Check order
                    if (Array.isArray(memberTypes)) {
                        const grouped = checkGroupSort(memberSet, memberTypes, supportsModifiers);
                        if (grouped == null) {
                            return false;
                        }
                        if (hasAlphaSort) {
                            return !grouped.some(groupMember => !checkAlphaSort(groupMember, order));
                        }
                    }
                    else if (hasAlphaSort) {
                        return checkAlphaSort(memberSet, order);
                    }
                    return true;
                };
                if (Array.isArray(orderConfig)) {
                    memberTypes = orderConfig;
                }
                else {
                    order = orderConfig.order;
                    memberTypes = orderConfig.memberTypes;
                    optionalityOrder = orderConfig.optionalityOrder;
                }
                if (!optionalityOrder) {
                    checkOrder(members);
                    return;
                }
                const switchIndex = members.findIndex((member, i) => i && isMemberOptional(member) !== isMemberOptional(members[i - 1]));
                if (switchIndex !== -1) {
                    if (!checkRequiredOrder(members, optionalityOrder)) {
                        return;
                    }
                    checkOrder(members.slice(0, switchIndex));
                    checkOrder(members.slice(switchIndex));
                }
            }