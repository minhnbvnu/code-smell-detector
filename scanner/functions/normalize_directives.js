function normalize_directives(body) {
        for (var i = 0; i < body.length; i++) {
            var stat = body[i];
            if (!(stat instanceof AST_SimpleStatement)) break;
            var node = stat.body;
            if (!(node instanceof AST_String)) break;
            if (stat.start.pos !== node.start.pos) break;
            body[i] = new AST_Directive(node);
        }
        return body;
    }