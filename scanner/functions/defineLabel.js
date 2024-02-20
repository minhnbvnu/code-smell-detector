function defineLabel() {
                if (!labelOffsets) {
                    labelOffsets = [];
                }
                const label = nextLabelId;
                nextLabelId++;
                labelOffsets[label] = -1;
                return label;
            }