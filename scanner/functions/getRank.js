function getRank(node, orderConfig, supportsModifiers) {
        const type = getNodeType(node);
        if (type == null) {
            // shouldn't happen but just in case, put it on the end
            return orderConfig.length - 1;
        }
        const abstract = node.type === utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition ||
            node.type === utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition;
        const scope = 'static' in node && node.static
            ? 'static'
            : abstract
                ? 'abstract'
                : 'instance';
        const accessibility = getAccessibility(node);
        // Collect all existing member groups that apply to this node...
        // (e.g. 'public-instance-field', 'instance-field', 'public-field', 'constructor' etc.)
        const memberGroups = [];
        if (supportsModifiers) {
            const decorated = 'decorators' in node && node.decorators.length > 0;
            if (decorated &&
                (type === 'readonly-field' ||
                    type === 'field' ||
                    type === 'method' ||
                    type === 'get' ||
                    type === 'set')) {
                memberGroups.push(`${accessibility}-decorated-${type}`);
                memberGroups.push(`decorated-${type}`);
                if (type === 'readonly-field') {
                    memberGroups.push(`${accessibility}-decorated-field`);
                    memberGroups.push(`decorated-field`);
                }
            }
            if (type !== 'readonly-signature' &&
                type !== 'signature' &&
                type !== 'static-initialization') {
                if (type !== 'constructor') {
                    // Constructors have no scope
                    memberGroups.push(`${accessibility}-${scope}-${type}`);
                    memberGroups.push(`${scope}-${type}`);
                    if (type === 'readonly-field') {
                        memberGroups.push(`${accessibility}-${scope}-field`);
                        memberGroups.push(`${scope}-field`);
                    }
                }
                memberGroups.push(`${accessibility}-${type}`);
                if (type === 'readonly-field') {
                    memberGroups.push(`${accessibility}-field`);
                }
            }
        }
        memberGroups.push(type);
        if (type === 'readonly-signature') {
            memberGroups.push('signature');
        }
        else if (type === 'readonly-field') {
            memberGroups.push('field');
        }
        // ...then get the rank order for those member groups based on the node
        return getRankOrder(memberGroups, orderConfig);
    }