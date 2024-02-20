function maybe_import_assertion() {
                if (is("name", "assert") && !has_newline_before(S.token)) {
                    next();
                    return object_or_destructuring_();
                }
                return null;
            }