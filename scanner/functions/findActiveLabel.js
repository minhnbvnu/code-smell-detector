function findActiveLabel(name) {
                for (let label = activeLabelList; label; label = label.next) {
                    if (label.name === name) {
                        return label;
                    }
                }
                return void 0;
            }