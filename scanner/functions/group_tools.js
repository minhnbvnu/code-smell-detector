function group_tools(tools, merge, ignore = new Set(["overlay", "renderers"])) {
        const by_type = new Map();
        const computed = [];
        for (const tool of tools) {
            if (tool instanceof tool_proxy_1.ToolProxy) {
                computed.push(tool);
            }
            else {
                const attrs = tool.attributes;
                for (const attr of ignore) {
                    if (attr in attrs) {
                        delete attrs[attr];
                    }
                }
                const proto = tool.constructor.prototype;
                let values = by_type.get(proto);
                if (values == null)
                    by_type.set(proto, values = new Set());
                values.add({ tool, attrs });
            }
        }
        for (const [cls, entries] of by_type.entries()) {
            if (merge != null) {
                const merged = merge(cls, [...entries].map((entry) => entry.tool));
                if (merged != null) {
                    computed.push(merged);
                    continue;
                }
            }
            while (entries.size != 0) {
                const [head, ...tail] = entries;
                entries.delete(head);
                const group = [head.tool];
                for (const item of tail) {
                    if ((0, eq_1.is_equal)(item.attrs, head.attrs)) {
                        group.push(item.tool);
                        entries.delete(item);
                    }
                }
                if (group.length == 1)
                    computed.push(group[0]);
                else {
                    const merged = merge === null || merge === void 0 ? void 0 : merge(cls, group);
                    computed.push(merged !== null && merged !== void 0 ? merged : new tool_proxy_1.ToolProxy({ tools: group }));
                }
            }
        }
        return computed;
    }