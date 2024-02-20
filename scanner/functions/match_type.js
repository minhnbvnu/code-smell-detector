function match_type(one_type, two_type, one, two) {
        if (one_type === two_type) {
            return true;
        } else {
            if (!funct.confusion && !two.warn) {
                if (typeof one !== 'string') {
                    if (one.id === '.') {
                        one_type = '.' + one.second.string + ': ' + one_type;
                    } else {
                        one_type = one.string + ': ' + one_type;
                    }
                }
                if (two.id === '.') {
                    two_type = '.' + two.second.string + ': ' + one_type;
                } else {
                    two_type = two.string + ': ' + one_type;
                }
                warn('type_confusion_a_b', two, one_type, two_type);
                two.warn = true;
            }
            return false;
        }
    }