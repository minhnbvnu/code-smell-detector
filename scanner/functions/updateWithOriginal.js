function updateWithOriginal(updated, original) {
            if (updated !== original) {
                setOriginalNode(updated, original);
                setTextRange(updated, original);
            }
            return updated;
        }