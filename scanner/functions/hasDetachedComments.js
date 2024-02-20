function hasDetachedComments(pos) {
                return detachedCommentsInfo !== void 0 && last(detachedCommentsInfo).nodePos === pos;
            }