function should_join(node) {
            var ev = node.evaluate(compressor);
            if (ev === node) return;
            if (tag && /\r|\\|`/.test(ev)) return;
            ev = escape_literal("" + ev);
            if (ev.length > node.print_to_string().length + "${}".length) return;
            return ev;
        }