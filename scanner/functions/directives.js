function directives(node) {
                return takeWhile(looksLikeDirective, node.body);
            }