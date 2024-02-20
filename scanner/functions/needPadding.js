function needPadding(lhs, rhs) {
    if ((0, type_guards_1.isBlank)(lhs) || (0, type_guards_1.isBlank)(rhs))
        return false;
    if ((0, type_guards_1.isRaw)(lhs) || (0, type_guards_1.isRaw)(rhs))
        return false;
    if ((0, type_guards_1.isDocument)(lhs) || (0, type_guards_1.isDocument)(rhs))
        return false;
    if ((0, type_guards_1.isPunctuation)(lhs))
        return lhs.needPaddingAfter(rhs);
    if ((0, type_guards_1.isPunctuation)(rhs))
        return rhs.needPaddingBefore(lhs);
    if ((0, type_guards_1.isAlphabetNumeric)(lhs))
        return !(0, type_guards_1.isAlphabetNumeric)(rhs);
    if ((0, type_guards_1.isUnicodeString)(lhs))
        return !(0, type_guards_1.isUnicodeString)(rhs);
    return true;
}