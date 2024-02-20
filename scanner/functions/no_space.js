function no_space(left, right) {
        left = left || token;
        right = right || next_token;
        if ((!option.white || xmode === 'styleproperty' || xmode === 'style') &&
                left.thru !== right.from && left.line === right.line) {
            warn('unexpected_space_a_b', right, artifact(left), artifact(right));
        }
    }