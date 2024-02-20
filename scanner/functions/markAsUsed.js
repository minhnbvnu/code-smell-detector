function markAsUsed(node) {
                if (!node.label) {
                    return;
                }
                const label = node.label.name;
                let info = scopeInfo;
                while (info) {
                    if (info.label === label) {
                        info.used = true;
                        break;
                    }
                    info = info.upper;
                }
            }