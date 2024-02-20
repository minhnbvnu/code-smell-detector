function addClassMembers(statements, node) {
                for (const member of node.members) {
                    switch (member.kind) {
                        case 237 /* SemicolonClassElement */:
                            statements.push(transformSemicolonClassElementToStatement(member));
                            break;
                        case 171 /* MethodDeclaration */:
                            statements.push(transformClassMethodDeclarationToStatement(getClassMemberPrefix(node, member), member, node));
                            break;
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const accessors = getAllAccessorDeclarations(node.members, member);
                            if (member === accessors.firstAccessor) {
                                statements.push(transformAccessorsToStatement(getClassMemberPrefix(node, member), accessors, node));
                            }
                            break;
                        case 173 /* Constructor */:
                        case 172 /* ClassStaticBlockDeclaration */:
                            break;
                        default:
                            Debug.failBadSyntaxKind(member, currentSourceFile && currentSourceFile.fileName);
                            break;
                    }
                }
            }