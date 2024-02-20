function comments(rules) {
            var c;
            rules = rules || [];
            while (c = comment()) {
                if (c !== false) {
                    rules.push(c);
                }
            }
            return rules;
        }