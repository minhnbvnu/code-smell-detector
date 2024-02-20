function finishClassElement(updated, original) {
                if (updated !== original) {
                    setCommentRange(updated, original);
                    setSourceMapRange(updated, moveRangePastDecorators(original));
                }
                return updated;
            }