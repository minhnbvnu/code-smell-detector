function checkMemberSeparatorStyle(node) {
                const members = node.type === utils_1.AST_NODE_TYPES.TSInterfaceBody ? node.body : node.members;
                let isSingleLine = node.loc.start.line === node.loc.end.line;
                if (options.multilineDetection === 'last-member' &&
                    !isSingleLine &&
                    members.length > 0) {
                    const lastMember = members[members.length - 1];
                    if (lastMember.loc.end.line === node.loc.end.line) {
                        isSingleLine = true;
                    }
                }
                const typeOpts = node.type === utils_1.AST_NODE_TYPES.TSInterfaceBody
                    ? interfaceOptions
                    : typeLiteralOptions;
                const opts = isSingleLine
                    ? Object.assign(Object.assign({}, typeOpts.singleline), { type: 'single-line' }) : Object.assign(Object.assign({}, typeOpts.multiline), { type: 'multi-line' });
                members.forEach((member, index) => {
                    checkLastToken(member, opts !== null && opts !== void 0 ? opts : {}, index === members.length - 1);
                });
            }