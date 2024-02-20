function isUnclosedFragment({ closingFragment, parent: parent2 }) {
                return !!(closingFragment.flags & 131072 /* ThisNodeHasError */) || isJsxFragment(parent2) && isUnclosedFragment(parent2);
            }