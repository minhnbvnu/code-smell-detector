function one_space(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && !option.white &&
                (token.line !== right.line ||
                token.thru + 1 !== right.from)) {
            warn('expected_space_a_b', right, artifact(token), artifact(right));
        }
    }