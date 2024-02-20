function aint(it, name, expected) {
        if (it[name] !== expected) {
            warn('expected_a_b', it, expected, it[name]);
            return true;
        } else {
            return false;
        }
    }