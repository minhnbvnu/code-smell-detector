function markLabel(label) {
                Debug.assert(labelOffsets !== void 0, "No labels were defined.");
                labelOffsets[label] = operations ? operations.length : 0;
            }