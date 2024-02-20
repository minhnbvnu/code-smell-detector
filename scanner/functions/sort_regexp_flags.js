function sort_regexp_flags(flags) {
            const existing_flags = new Set(flags.split(""));
            let out = "";
            for (const flag of all_flags) {
                if (existing_flags.has(flag)) {
                    out += flag;
                    existing_flags.delete(flag);
                }
            }
            if (existing_flags.size) {
                // Flags Terser doesn't know about
                existing_flags.forEach(flag => { out += flag; });
            }
            return out;
        }