function one_space_only(left, right) {
        left = left || token;
        right = right || next_token;
        if (right.id !== '(end)' && (left.line !== right.line ||
                (!option.white && left.thru + 1 !== right.from))) {
            warn('expected_space_a_b', right, artifact(left), artifact(right));
        }
    }