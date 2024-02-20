function checkClassForStaticPropertyNameConflicts(node) {
                for (const member of node.members) {
                    const memberNameNode = member.name;
                    const isStaticMember = isStatic(member);
                    if (isStaticMember && memberNameNode) {
                        const memberName = getPropertyNameForPropertyNameNode(memberNameNode);
                        switch (memberName) {
                            case "name":
                            case "length":
                            case "caller":
                            case "arguments":
                            case "prototype":
                                const message = Diagnostics.Static_property_0_conflicts_with_built_in_property_Function_0_of_constructor_function_1;
                                const className = getNameOfSymbolAsWritten(getSymbolOfDeclaration(node));
                                error(memberNameNode, message, memberName, className);
                                break;
                        }
                    }
                }
            }