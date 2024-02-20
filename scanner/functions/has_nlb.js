function has_nlb() {
                const output = OUTPUT.toString();
                let n = output.length - 1;
                while (n >= 0) {
                    const code = output.charCodeAt(n);
                    if (code === CODE_LINE_BREAK) {
                        return true;
                    }
                    if (code !== CODE_SPACE) {
                        return false;
                    }
                    n--;
                }
                return true;
            }