function updateWithoutOriginal(updated, original) {
            if (updated !== original) {
                setTextRange(updated, original);
            }
            return updated;
        }