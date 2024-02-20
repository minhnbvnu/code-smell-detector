function next_name() {
                var name;
                do {
                    name = nth_identifier.get(cname++);
                } while (avoid.has(name) || ALL_RESERVED_WORDS.has(name));
                return name;
            }