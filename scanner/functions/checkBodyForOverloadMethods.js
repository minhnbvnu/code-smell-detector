function checkBodyForOverloadMethods(node) {
                const members = getMembers(node);
                if (members) {
                    let lastMethod = null;
                    const seenMethods = [];
                    members.forEach(member => {
                        const method = getMemberMethod(member);
                        if (method == null) {
                            lastMethod = null;
                            return;
                        }
                        const index = seenMethods.findIndex(seenMethod => isSameMethod(method, seenMethod));
                        if (index > -1 && !isSameMethod(method, lastMethod)) {
                            context.report({
                                node: member,
                                messageId: 'adjacentSignature',
                                data: {
                                    name: `${method.static ? 'static ' : ''}${method.name}`,
                                },
                            });
                        }
                        else if (index === -1) {
                            seenMethods.push(method);
                        }
                        lastMethod = method;
                    });
                }
            }