function getMemberMethod(member) {
                var _a, _b;
                if (!member) {
                    return null;
                }
                const isStatic = 'static' in member && !!member.static;
                switch (member.type) {
                    case utils_1.AST_NODE_TYPES.ExportDefaultDeclaration:
                    case utils_1.AST_NODE_TYPES.ExportNamedDeclaration: {
                        // export statements (e.g. export { a };)
                        // have no declarations, so ignore them
                        if (!member.declaration) {
                            return null;
                        }
                        return getMemberMethod(member.declaration);
                    }
                    case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                    case utils_1.AST_NODE_TYPES.FunctionDeclaration: {
                        const name = (_b = (_a = member.id) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null;
                        if (name == null) {
                            return null;
                        }
                        return {
                            name,
                            static: isStatic,
                            callSignature: false,
                            type: util.MemberNameType.Normal,
                        };
                    }
                    case utils_1.AST_NODE_TYPES.TSMethodSignature:
                        return Object.assign(Object.assign({}, util.getNameFromMember(member, sourceCode)), { static: isStatic, callSignature: false });
                    case utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration:
                        return {
                            name: 'call',
                            static: isStatic,
                            callSignature: true,
                            type: util.MemberNameType.Normal,
                        };
                    case utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration:
                        return {
                            name: 'new',
                            static: isStatic,
                            callSignature: false,
                            type: util.MemberNameType.Normal,
                        };
                    case utils_1.AST_NODE_TYPES.MethodDefinition:
                        return Object.assign(Object.assign({}, util.getNameFromMember(member, sourceCode)), { static: isStatic, callSignature: false });
                }
                return null;
            }