function check_relation(node) {
        switch (node.arity) {
        case 'prefix':
            switch (node.id) {
            case '{':
            case '[':
                warn('unexpected_a', node);
                break;
            case '!':
                warn('confusing_a', node);
                break;
            }
            break;
        case 'function':
        case 'regexp':
            warn('unexpected_a', node);
            break;
        default:
            if (node.id  === 'NaN') {
                warn('isnan', node);
            }
        }
        return node;
    }