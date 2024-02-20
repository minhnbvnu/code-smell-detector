function is_nullish_check(check, check_subject, compressor) {
            if (check_subject.may_throw(compressor))
                return false;
            let nullish_side;
            // foo == null
            if (check instanceof AST_Binary
                && check.operator === "=="
                // which side is nullish?
                && ((nullish_side = is_nullish(check.left, compressor) && check.left)
                    || (nullish_side = is_nullish(check.right, compressor) && check.right))
                // is the other side the same as the check_subject
                && (nullish_side === check.left
                    ? check.right
                    : check.left).equivalent_to(check_subject)) {
                return true;
            }
            // foo === null || foo === undefined
            if (check instanceof AST_Binary && check.operator === "||") {
                let null_cmp;
                let undefined_cmp;
                const find_comparison = cmp => {
                    if (!(cmp instanceof AST_Binary
                        && (cmp.operator === "===" || cmp.operator === "=="))) {
                        return false;
                    }
                    let found = 0;
                    let defined_side;
                    if (cmp.left instanceof AST_Null) {
                        found++;
                        null_cmp = cmp;
                        defined_side = cmp.right;
                    }
                    if (cmp.right instanceof AST_Null) {
                        found++;
                        null_cmp = cmp;
                        defined_side = cmp.left;
                    }
                    if (is_undefined(cmp.left, compressor)) {
                        found++;
                        undefined_cmp = cmp;
                        defined_side = cmp.right;
                    }
                    if (is_undefined(cmp.right, compressor)) {
                        found++;
                        undefined_cmp = cmp;
                        defined_side = cmp.left;
                    }
                    if (found !== 1) {
                        return false;
                    }
                    if (!defined_side.equivalent_to(check_subject)) {
                        return false;
                    }
                    return true;
                };
                if (!find_comparison(check.left))
                    return false;
                if (!find_comparison(check.right))
                    return false;
                if (null_cmp && undefined_cmp && null_cmp !== undefined_cmp) {
                    return true;
                }
            }
            return false;
        }