function resolveChild(child) {
            if (!Array.isArray(child)) {
                return Animation._resolveStyles(child);
            }
            const start = [],
                d = [],
                dest = [];
            for (let i = 0; i < child.length; i++) {
                const styles = Animation._resolveStyles(child[i]);
                if (styles) {
                    start.push(styles[0]);
                    d.push(styles[1]);
                    dest.push(styles[2]);
                }
            }
            if (!start.length) {
                return null;
            } else {
                return [start, d, dest];
            }
        }