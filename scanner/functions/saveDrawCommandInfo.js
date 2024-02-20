function saveDrawCommandInfo(opts, uniforms, attributes, stringStore) {
            saveCommandRef(opts);
            function id(str) {
                if (str) {
                    return stringStore.id(str);
                }
                return 0;
            }
            opts._fragId = id(opts.static.frag);
            opts._vertId = id(opts.static.vert);
            function addProps(dict, set) {
                Object.keys(set).forEach(function (u) {
                    dict[stringStore.id(u)] = true;
                });
            }
            var uniformSet = opts._uniformSet = {};
            addProps(uniformSet, uniforms.static);
            addProps(uniformSet, uniforms.dynamic);
            var attributeSet = opts._attributeSet = {};
            addProps(attributeSet, attributes.static);
            addProps(attributeSet, attributes.dynamic);
            opts._hasCount = ('count' in opts.static ||
                'count' in opts.dynamic ||
                'elements' in opts.static ||
                'elements' in opts.dynamic);
        }