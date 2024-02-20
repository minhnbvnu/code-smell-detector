function checkClassForDuplicateDeclarations(node) {
                const instanceNames = /* @__PURE__ */ new Map();
                const staticNames = /* @__PURE__ */ new Map();
                const privateIdentifiers = /* @__PURE__ */ new Map();
                for (const member of node.members) {
                    if (member.kind === 173 /* Constructor */) {
                        for (const param of member.parameters) {
                            if (isParameterPropertyDeclaration(param, member) && !isBindingPattern(param.name)) {
                                addName(instanceNames, param.name, param.name.escapedText, 3 /* GetOrSetAccessor */);
                            }
                        }
                    }
                    else {
                        const isStaticMember = isStatic(member);
                        const name = member.name;
                        if (!name) {
                            continue;
                        }
                        const isPrivate = isPrivateIdentifier(name);
                        const privateStaticFlags = isPrivate && isStaticMember ? 16 /* PrivateStatic */ : 0;
                        const names = isPrivate ? privateIdentifiers : isStaticMember ? staticNames : instanceNames;
                        const memberName = name && getPropertyNameForPropertyNameNode(name);
                        if (memberName) {
                            switch (member.kind) {
                                case 174 /* GetAccessor */:
                                    addName(names, name, memberName, 1 /* GetAccessor */ | privateStaticFlags);
                                    break;
                                case 175 /* SetAccessor */:
                                    addName(names, name, memberName, 2 /* SetAccessor */ | privateStaticFlags);
                                    break;
                                case 169 /* PropertyDeclaration */:
                                    addName(names, name, memberName, 3 /* GetOrSetAccessor */ | privateStaticFlags);
                                    break;
                                case 171 /* MethodDeclaration */:
                                    addName(names, name, memberName, 8 /* Method */ | privateStaticFlags);
                                    break;
                            }
                        }
                    }
                }
                function addName(names, location, name, meaning) {
                    const prev = names.get(name);
                    if (prev) {
                        if ((prev & 16 /* PrivateStatic */) !== (meaning & 16 /* PrivateStatic */)) {
                            error(location, Diagnostics.Duplicate_identifier_0_Static_and_instance_elements_cannot_share_the_same_private_name, getTextOfNode(location));
                        }
                        else {
                            const prevIsMethod = !!(prev & 8 /* Method */);
                            const isMethod = !!(meaning & 8 /* Method */);
                            if (prevIsMethod || isMethod) {
                                if (prevIsMethod !== isMethod) {
                                    error(location, Diagnostics.Duplicate_identifier_0, getTextOfNode(location));
                                }
                            }
                            else if (prev & meaning & ~16 /* PrivateStatic */) {
                                error(location, Diagnostics.Duplicate_identifier_0, getTextOfNode(location));
                            }
                            else {
                                names.set(name, prev | meaning);
                            }
                        }
                    }
                    else {
                        names.set(name, meaning);
                    }
                }
            }