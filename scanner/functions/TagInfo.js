function TagInfo(env, taggable, defaultTags, tag, tagId, tagFormat, noTag, labelId) {
            if (env === void 0) {
                env = '';
            }
            if (taggable === void 0) {
                taggable = false;
            }
            if (defaultTags === void 0) {
                defaultTags = false;
            }
            if (tag === void 0) {
                tag = null;
            }
            if (tagId === void 0) {
                tagId = '';
            }
            if (tagFormat === void 0) {
                tagFormat = '';
            }
            if (noTag === void 0) {
                noTag = false;
            }
            if (labelId === void 0) {
                labelId = '';
            }
            this.env = env;
            this.taggable = taggable;
            this.defaultTags = defaultTags;
            this.tag = tag;
            this.tagId = tagId;
            this.tagFormat = tagFormat;
            this.noTag = noTag;
            this.labelId = labelId;
        }