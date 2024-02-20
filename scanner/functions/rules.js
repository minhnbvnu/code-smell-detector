function rules() {
            var node;
            var rules = [];
            whitespace();
            comments(rules);
            while (css.length && css.charAt(0) != '}' && (node = atrule() || rule())) {
                if (node !== false) {
                    rules.push(node);
                    comments(rules);
                }
            }
            return rules;
        }