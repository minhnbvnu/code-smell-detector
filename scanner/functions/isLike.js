function isLike(obj, reg) {
            if (isString(reg)) {
                return ("" + obj).match(reg) !== null;
            } else if (isRegExp(reg)) {
                return reg.test(obj);
            }
            return false;
        }