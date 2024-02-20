function is_unicode_combining_mark(ch) {
        return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
}