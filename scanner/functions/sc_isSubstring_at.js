function sc_isSubstring_at(s1, s2, i) {
    return s2 == s1.substring(i, i+ s2.length);
}