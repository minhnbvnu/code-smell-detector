function gridplot(children, options = {}) {
        var _a;
        const toolbar_location = options.toolbar_location;
        const merge_tools = (_a = options.merge_tools) !== null && _a !== void 0 ? _a : true;
        const sizing_mode = options.sizing_mode;
        const matrix = matrix_1.Matrix.from(children);
        const items = [];
        const tools = [];
        for (const [item, row, col] of matrix) {
            if (item == null)
                continue;
            if (item instanceof plots_1.Plot) {
                if (merge_tools) {
                    tools.push(...item.toolbar.tools);
                    item.toolbar_location = null;
                }
            }
            if (options.width != null)
                item.width = options.width;
            if (options.height != null)
                item.height = options.height;
            items.push([item, row, col]);
        }
        function merge(_cls, group) {
            const tool = group[0];
            if (tool instanceof save_tool_1.SaveTool)
                return new save_tool_1.SaveTool();
            else if (tool instanceof copy_tool_1.CopyTool)
                return new copy_tool_1.CopyTool();
            else if (tool instanceof examine_tool_1.ExamineTool)
                return new examine_tool_1.ExamineTool();
            else if (tool instanceof fullscreen_tool_1.FullscreenTool)
                return new fullscreen_tool_1.FullscreenTool();
            else
                return null;
        }
        const toolbar = new toolbar_1.Toolbar({ tools: !merge_tools ? tools : group_tools(tools, merge) });
        return new plots_1.GridPlot({ children: items, toolbar, toolbar_location, sizing_mode });
    }