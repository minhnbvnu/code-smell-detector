function is_last_statement(body, stat) {
        var index = body.lastIndexOf(stat);
        if (index < 0) return false;
        while (++index < body.length) {
            if (!is_declaration(body[index], true)) return false;
        }
        return true;
    }