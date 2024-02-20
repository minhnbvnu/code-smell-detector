function js_error(message, filename, line, col, pos) {
            throw new JS_Parse_Error(message, filename, line, col, pos);
        }