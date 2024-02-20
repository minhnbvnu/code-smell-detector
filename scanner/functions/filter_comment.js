function filter_comment(comment) {
                if (!options.preserve_annotations) {
                    comment = comment.replace(r_annotation, " ");
                }
                if (/^\s*$/.test(comment)) {
                    return "";
                }
                return comment.replace(/(<\s*\/\s*)(script)/i, "<\\/$2");
            }