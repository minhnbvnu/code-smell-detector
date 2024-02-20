function getKind(label) {
                let info = scopeInfo;
                while (info) {
                    if (info.label === label) {
                        return info.kind;
                    }
                    info = info.upper;
                }
                /* c8 ignore next */
                return "other";
            }