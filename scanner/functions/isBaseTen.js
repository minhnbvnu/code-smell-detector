function isBaseTen(node) {
                const prefixes = ["0x", "0X", "0b", "0B", "0o", "0O"];
                return prefixes.every(prefix => !node.raw.startsWith(prefix)) &&
                    !/^0[0-7]+$/u.test(node.raw);
            }