function createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members) {
                const node = createBaseDeclaration(197 /* MappedType */);
                node.readonlyToken = readonlyToken;
                node.typeParameter = typeParameter;
                node.nameType = nameType;
                node.questionToken = questionToken;
                node.type = type;
                node.members = members && createNodeArray(members);
                node.transformFlags = 1 /* ContainsTypeScript */;
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }