function tagformatConfig(config, jax) {
        var tags = jax.parseOptions.options.tags;
        if (tags !== 'base' && config.tags.hasOwnProperty(tags)) {
            Tags_js_1.TagsFactory.add(tags, config.tags[tags]);
        }
        var TagClass = Tags_js_1.TagsFactory.create(jax.parseOptions.options.tags).constructor;
        var TagFormat = (function (_super) {
            __extends(TagFormat, _super);
            function TagFormat() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TagFormat.prototype.formatNumber = function (n) {
                return jax.parseOptions.options.tagformat.number(n);
            };
            TagFormat.prototype.formatTag = function (tag) {
                return jax.parseOptions.options.tagformat.tag(tag);
            };
            TagFormat.prototype.formatId = function (id) {
                return jax.parseOptions.options.tagformat.id(id);
            };
            TagFormat.prototype.formatUrl = function (id, base) {
                return jax.parseOptions.options.tagformat.url(id, base);
            };
            return TagFormat;
        }(TagClass));
        tagID++;
        var tagName = 'configTags-' + tagID;
        Tags_js_1.TagsFactory.add(tagName, TagFormat);
        jax.parseOptions.options.tags = tagName;
    }