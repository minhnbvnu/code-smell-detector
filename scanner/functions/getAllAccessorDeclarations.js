function getAllAccessorDeclarations(declarations, accessor) {
            let firstAccessor;
            let secondAccessor;
            let getAccessor;
            let setAccessor;
            if (hasDynamicName(accessor)) {
                firstAccessor = accessor;
                if (accessor.kind === 174 /* GetAccessor */) {
                    getAccessor = accessor;
                }
                else if (accessor.kind === 175 /* SetAccessor */) {
                    setAccessor = accessor;
                }
                else {
                    Debug.fail("Accessor has wrong kind");
                }
            }
            else {
                forEach(declarations, (member) => {
                    if (isAccessor(member) && isStatic(member) === isStatic(accessor)) {
                        const memberName = getPropertyNameForPropertyNameNode(member.name);
                        const accessorName = getPropertyNameForPropertyNameNode(accessor.name);
                        if (memberName === accessorName) {
                            if (!firstAccessor) {
                                firstAccessor = member;
                            }
                            else if (!secondAccessor) {
                                secondAccessor = member;
                            }
                            if (member.kind === 174 /* GetAccessor */ && !getAccessor) {
                                getAccessor = member;
                            }
                            if (member.kind === 175 /* SetAccessor */ && !setAccessor) {
                                setAccessor = member;
                            }
                        }
                    }
                });
            }
            return {
                firstAccessor,
                secondAccessor,
                getAccessor,
                setAccessor
            };
        }